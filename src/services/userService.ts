import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export class UserService {
  async register(data: { name: string; email: string; password: string }) {
    const emailExiste = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (emailExiste) {
      throw new Error("Email já cadastrado");
    }

    const senhaHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: senhaHash,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(data.password, user.password);

    if (!senhaValida) {
      throw new Error("Email ou senha inválidos");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
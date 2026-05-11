import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { registerSchema, loginSchema } from "../schemas/userSchema";

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ erros: result.error.flatten().fieldErrors });
    }

    try {
      const user = await userService.register(result.data);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ erros: result.error.flatten().fieldErrors });
    }

    try {
      const data = await userService.login(result.data);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(401).json({ erro: error.message });
    }
  }
}
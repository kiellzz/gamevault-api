import prisma from "../prisma";

export class GameService {
  async listarTodos(filters: { genre?: string; platform?: string; title?: string }) {
    return prisma.game.findMany({
      where: {
        genre: filters.genre ? { contains: filters.genre, mode: "insensitive" } : undefined,
        platform: filters.platform ? { contains: filters.platform, mode: "insensitive" } : undefined,
        title: filters.title ? { contains: filters.title, mode: "insensitive" } : undefined,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async buscarPorId(id: number) {
    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });

    if (!game) throw new Error("Jogo não encontrado");
    return game;
  }

  async criar(data: { title: string; genre: string; platform: string; releaseYear: number; coverUrl?: string }) {
    return prisma.game.create({ data });
  }
}
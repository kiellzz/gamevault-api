import { Response } from "express";
import { GameService } from "../services/gameService";
import { gameSchema, collectionSchema, reviewSchema } from "../schemas/gameSchema";
import { AuthRequest } from "../middlewares/authMiddleware";
import prisma from "../prisma";

const gameService = new GameService();

export class GameController {
  async listarTodos(req: AuthRequest, res: Response) {
    const { genre, platform, title } = req.query as Record<string, string>;
    const games = await gameService.listarTodos({ genre, platform, title });
    return res.json(games);
  }

  async buscarPorId(req: AuthRequest, res: Response) {
    try {
      const game = await gameService.buscarPorId(Number(req.params.id));
      return res.json(game);
    } catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  }

  async criar(req: AuthRequest, res: Response) {
    const result = gameSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ erros: result.error.flatten().fieldErrors });
    }
    try {
      const game = await gameService.criar(result.data);
      return res.status(201).json(game);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async adicionarNaColecao(req: AuthRequest, res: Response) {
    const result = collectionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ erros: result.error.flatten().fieldErrors });
    }

    try {
      const collection = await prisma.gameCollection.upsert({
        where: {
          userId_gameId: {
            userId: req.userId!,
            gameId: Number(req.params.id),
          },
        },
        update: { status: result.data.status },
        create: {
          userId: req.userId!,
          gameId: Number(req.params.id),
          status: result.data.status,
        },
      });
      return res.json(collection);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async avaliar(req: AuthRequest, res: Response) {
    const result = reviewSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ erros: result.error.flatten().fieldErrors });
    }

    try {
      const review = await prisma.review.upsert({
        where: {
          userId_gameId: {
            userId: req.userId!,
            gameId: Number(req.params.id),
          },
        },
        update: { rating: result.data.rating, content: result.data.content },
        create: {
          userId: req.userId!,
          gameId: Number(req.params.id),
          rating: result.data.rating,
          content: result.data.content,
        },
      });
      return res.json(review);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async minhaColecao(req: AuthRequest, res: Response) {
    const collection = await prisma.gameCollection.findMany({
      where: { userId: req.userId! },
      include: { game: true },
      orderBy: { updatedAt: "desc" },
    });
    return res.json(collection);
  }
}
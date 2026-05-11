import { z } from "zod";

export const gameSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  genre: z.string().min(1, "Gênero é obrigatório"),
  platform: z.string().min(1, "Plataforma é obrigatória"),
  releaseYear: z.number().int().min(1950, "Ano inválido").max(new Date().getFullYear() + 1, "Ano inválido"),
  coverUrl: z.string().url("URL inválida").optional(),
});

export const collectionSchema = z.object({
  status: z.enum(["playing", "completed", "dropped", "wishlist"]),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Nota mínima é 1").max(10, "Nota máxima é 10"),
  content: z.string().optional(),
});
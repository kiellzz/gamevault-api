import { Router } from "express";
import { GameController } from "../controllers/gameController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const gameController = new GameController();

// Rotas públicas
router.get("/games", (req, res) => gameController.listarTodos(req, res));
router.get("/games/:id", (req, res) => gameController.buscarPorId(req, res));

// Rotas protegidas
router.post("/games", authMiddleware, (req, res) => gameController.criar(req, res));
router.post("/games/:id/collection", authMiddleware, (req, res) => gameController.adicionarNaColecao(req, res));
router.post("/games/:id/review", authMiddleware, (req, res) => gameController.avaliar(req, res));
router.get("/users/collection", authMiddleware, (req, res) => gameController.minhaColecao(req, res));

export default router;
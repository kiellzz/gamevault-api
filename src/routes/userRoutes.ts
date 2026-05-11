import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/users/register", (req, res) => userController.register(req, res));
router.post("/users/login", (req, res) => userController.login(req, res));

export default router;
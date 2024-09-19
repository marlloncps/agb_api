import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.post('/login', userController.login)
router.post('/register', userController.register)

export default router;
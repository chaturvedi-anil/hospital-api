import { Router } from "express";
import { registerDoctor } from "../controllers/api/doctorsController.js";
const docterRouter = Router();

docterRouter.post('/register', registerDoctor);

export default docterRouter;
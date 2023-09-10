import { Router } from "express";

import 
{ 
    registerDoctor,
    createSession
} from "../controllers/api/doctorsController.js";

const docterRouter = Router();

// register doctor
docterRouter.post('/register', registerDoctor);

// create session for doctor 
docterRouter.post
(
    '/create-session', 
    createSession
);

export default docterRouter;
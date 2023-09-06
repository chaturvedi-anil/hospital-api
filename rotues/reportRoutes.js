import { Router } from 'express';
import { createReport } from '../controllers/api/reportsController.js';
const reportRouter = Router();


reportRouter.post('/create-report', createReport);

export default reportRouter;
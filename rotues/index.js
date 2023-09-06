import { Router } from 'express';
import doctorRoutes from './doctorRoutes.js';
import patientRoutes from './patientsRoutes.js';
import reportRouter from './reportRoutes.js';
const router = Router();

router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/reports', reportRouter);

export default router;
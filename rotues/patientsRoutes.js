import { Router } from 'express';
import { registerPatient } from '../controllers/api/patientsController.js';
const patientRouter = Router();

console.log('patient rotues');
patientRouter.post('/register', registerPatient);

export default patientRouter;
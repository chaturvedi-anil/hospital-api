import { Router } from 'express';
import passport from 'passport';
import 
{ 
    registerPatient, 
    createReport, 
    patientProfile 
} from '../controllers/api/patientsController.js';

const patientRouter = Router();

// Middleware function to check if the authenticated user is a doctor
const isDoctor = (req, res, next) => 
{
    if (req.user && req.user.role === 'doctor') 
    {
      // If the user is authenticated and has the 'doctor' role, proceed to the next middleware/route handler
      next();
    } 
    else 
    {
      // If the user is not a doctor, respond with an unauthorized status  
        res.status(401).json(
        {
            "status": "error", 
            "message": 'Unauthorized. Only doctors can create patient reports.' 
        });
    }
};


patientRouter.post('/register',
    passport.authenticate('jwt', {session:false}),
    isDoctor,
    registerPatient
);

// patient login
patientRouter.get('/get-profile', patientProfile);

// only doctor can create patient report
patientRouter.post('/:id/create-report', 
    passport.authenticate('jwt', {session:false}),
    isDoctor,
    createReport
);

export default patientRouter;
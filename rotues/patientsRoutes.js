import { Router } from 'express';
import passport from 'passport';
import 
{ 
    registerPatient, 
    createReport, 
    getAllReports ,
    getAllPatients
} from '../controllers/api/patientsController.js';

const patientRouter = Router();

// only doctor can register new patient
patientRouter.post
(
    '/register', //route
    passport.authenticate('jwt', {session:false}), //jwt authentication using passport 
    registerPatient //controller
);

//patient login need to send patient id in params
patientRouter.get('/all-reports', getAllReports);

// get all patients 
patientRouter.get
(
    '/all-patients',
    passport.authenticate('jwt', {session:false}), //jwt authentication using passport  
    getAllPatients
);


// only doctor can create patient report
patientRouter.post
(
    '/:id/create-report', //need to send patient id in params 
    passport.authenticate('jwt', {session:false}), //jwt authentication using passport 
    createReport //controller
);

export default patientRouter;
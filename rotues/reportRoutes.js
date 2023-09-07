import { Router } from 'express';
import passport from 'passport';
import { getPatientReportsByStatus } from '../controllers/api/reportsController.js';
const reportRouter = Router();

// Only doctor can see patient reports by status 
reportRouter.get
(
    '/:status', //route
    passport.authenticate('jwt', {session:false}), // jwt authentication using passport
    getPatientReportsByStatus // controller
);

export default reportRouter;
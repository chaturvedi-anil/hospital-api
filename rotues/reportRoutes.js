import { Router } from 'express';
import passport from 'passport';
import { getReportsByStatus } from '../controllers/api/reportsController.js';
const reportRouter = Router();


reportRouter.get
(
    '/:status', //route
    passport.authenticate('jwt', {session:false}), // jwt authentication using passport
    getReportsByStatus // controller
);

export default reportRouter;
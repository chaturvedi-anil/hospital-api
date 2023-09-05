import { Router } from 'express';
import doctorRoutes from './doctorRoutes.js';
import patientRoutes from './patientsRoutes.js';
const router = Router();

// router.get('/', (req, res)=>
// {
//     res.send('Express server using route');
// });

router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);

export default router;
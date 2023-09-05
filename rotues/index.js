import { Router } from 'express';
import doctorRoutes from './doctorRoutes.js';
const router = Router();

// router.get('/', (req, res)=>
// {
//     res.send('Express server using route');
// });

router.use('/doctor', doctorRoutes);

export default router;
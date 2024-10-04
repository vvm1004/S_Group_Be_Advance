import express from 'express';
import userRoutes from './users/userRoutes.js';
import authRoutes from './auth/authRoutes.js';
import roleRoutes from './role/roleRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);



export default router;
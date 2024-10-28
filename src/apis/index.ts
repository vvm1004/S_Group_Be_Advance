import express from 'express';
import userRoutes from './users/userRoutes.js';
import authRoutes from './auth/authRoutes.js';
import roleRoutes from './role/roleRoutes.js';
import permissionRoutes from './permission/permissionRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);

export default router;

import { Router } from 'express';
import {
    createPermissionController,
    getPermissionsController,
    updatePermissionController,
    deletePermissionController
} from './permissionController.ts';

const router = Router();

router.post('/', createPermissionController);
router.get('/', getPermissionsController);
// router.get('/:id', getPermissionByIdController);
router.put('/:id', updatePermissionController);
router.delete('/:id', deletePermissionController);

export default router;

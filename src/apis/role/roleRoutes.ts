import { Router } from 'express';
import { createRoleController, assignPermissionToRoleController, assignRoleToUserController } from './roleController.ts';
import { checkPermission } from '../../middleware/checkPermission.ts';
import { verifyToken } from '../../middleware/index.ts';
const router = Router();

router.post('/',verifyToken, checkPermission('create_role'), createRoleController);

router.post('/assign-permission',verifyToken, checkPermission('assign_permission'), assignPermissionToRoleController);

router.post('/assign-role', verifyToken, assignRoleToUserController);

export default router;

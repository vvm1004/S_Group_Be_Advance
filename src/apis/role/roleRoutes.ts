import { Router } from 'express';
import RoleController from './roleController.ts'

const router = Router();

router.post('/', RoleController.createRole);
router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

router.get('/:id/users', RoleController.getUsersByRole);

export default router;

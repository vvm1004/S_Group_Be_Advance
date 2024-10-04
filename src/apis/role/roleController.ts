import { Request, Response } from 'express';
import RoleService from './roleService.ts';
import { Role } from '../../types'

class RoleController {
    static async createRole(req: Request, res: Response): Promise<void> {
        try {
            const roleId = await RoleService.createRole(req.body as Role);
            res.status(201).json({ message: 'Role created', id: roleId });
        } catch (error: any) {
            if (error.message === 'Role Name already exists') {
                res.status(400).json({ message: 'Role Name already exists' });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    static async getAllRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await RoleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getRoleById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const role = await RoleService.getRoleById(Number(id));
            res.status(200).json(role);
        } catch (error: any) {
            if (error.message === 'Role not found') {
                res.status(404).json({ message: 'Role not found' });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    static async updateRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await RoleService.updateRole(Number(id), req.body as Partial<Role>);
            res.status(200).json({ message: 'Role updated successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await RoleService.deleteRole(Number(id));
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUsersByRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const users = await RoleService.getUsersByRole(Number(id));
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default RoleController;

import { Request, Response } from 'express';
import { createRole, assignPermissionToRole, assignRoleToUser } from './roleService.ts';
import { CustomeRequest } from '../../types/index.ts';

export const createRoleController = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const role = await createRole(name);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignPermissionToRoleController = async (req: Request, res: Response) => {
  const { roleId, permissionId } = req.body;
  try {
    const role = await assignPermissionToRole(roleId, permissionId);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignRoleToUserController = async (req: CustomeRequest, res: Response) => {
  const { roleId } = req.body;
  const userId = typeof req.user === 'object' && 'id' in req.user ? Number(req.user.id) : null;

  try {
    const updatedUser = await assignRoleToUser(userId, roleId);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in assignRoleToUserController:', error);
    res.status(400).json({ message: error.message });
  }
};
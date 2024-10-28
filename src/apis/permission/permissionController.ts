import { Request, Response } from 'express';
import { 
  createPermission, 
  getPermissionById, 
  getPermissions, 
  updatePermission, 
  deletePermission 
} from './permissionService.ts';


export const createPermissionController = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const permission = await createPermission(name);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPermissionsController = async (_req: Request, res: Response) => {
  try {
    const permissions = await getPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getPermissionByIdController = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const permission = await getPermissionById(Number(id));
//     if (!permission) {
//       return res.status(404).json({ message: "Permission not found" });
//     }
//     res.status(200).json(permission);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updatePermissionController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedPermission = await updatePermission(Number(id), name);
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePermissionController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deletePermission(Number(id));
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

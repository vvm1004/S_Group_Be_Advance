import { Permission } from '../../models/entities/Permission.ts';
import { AppDataSource } from '../../database/typeorm.config.ts';

const permissionRepository = AppDataSource.getRepository(Permission);

export const createPermission = async (name: string) => {
  const existingPermission = await permissionRepository.findOne({ where: { name } });
  if (existingPermission) {
    throw new Error(`Permission with name "${name}" already exists.`);
  }
  const permission = permissionRepository.create({ name });
  return permissionRepository.save(permission);
};

export const getPermissions = async () => {
  return permissionRepository.find();
};

export const getPermissionById = async (id: number) => {
  return permissionRepository.findOne({ where: { id } });
};

export const updatePermission = async (id: number, name: string) => {
  const permission = await permissionRepository.findOne({ where: { id } });
  if (!permission) {
    throw new Error("Permission not found");
  }
  permission.name = name;
  return permissionRepository.save(permission);
};

export const deletePermission = async (id: number) => {
  const permission = await permissionRepository.findOne({ where: { id } });
  if (!permission) {
    throw new Error("Permission not found");
  }
  return permissionRepository.remove(permission);
};

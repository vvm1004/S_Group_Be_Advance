import { AppDataSource } from "../../database/typeorm.config.ts";
import { Role } from '../../models/entities/Role.ts';
import { Permission } from '../../models/entities/Permission.ts';
import { User } from "../../models/entities/User.ts";

const roleRepository = AppDataSource.getRepository(Role);

export const createRole = async (name: string) => {
   const existingRole = await roleRepository.findOne({ where: { name } });
  
  if (existingRole) {
    throw new Error(`Role with name "${name}" already exists.`);
  }
  const role = roleRepository.create({ name });
  return roleRepository.save(role);
};

export const assignPermissionToRole = async (roleId: number, permissionId: number) => {
  const permissionRepository = AppDataSource.getRepository(Permission);

  const role = await roleRepository.findOne({
    where: { id: roleId },
    relations: ['permissions']  
  });

  const permission = await permissionRepository.findOne({
    where: { id: permissionId }
  });

  if (role && permission) {
    role.permissions.push(permission);
    return roleRepository.save(role);
  }

  throw new Error('Role or Permission not found');
};


export const assignRoleToUser = async (userId: number, roleId: number) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
  if (!user) {
    throw new Error('User not found');
  }

  const role = await roleRepository.findOne({ where: { id: roleId } });
  if (!role) {
    throw new Error('Role not found');
  }

  if (!user.roles) {
    user.roles = [];
  }


  user.roles.push(role);
  return userRepository.save(user);
};

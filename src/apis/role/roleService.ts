import RoleModel from '../../models/roleModel.ts';
import { User, Role } from '../../types'

class RoleService {
    async createRole(role: Role): Promise<number> {
        const existingRoleName = await RoleModel.getRoleByName(role.name);
        if (existingRoleName) {
            throw new Error('Role Name already exists');
        }
        return await RoleModel.createRole(role);
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            return await RoleModel.getAllRoles();
        } catch (error: any) {
            throw new Error('Error in RoleService.getAllRoles: ' + error.message);
        }
    }

    async getRoleById(id: number): Promise<Role> {
        const role = await RoleModel.getRoleById(id);
        if (!role) throw new Error('Role not found');
        return role;
    }

    async updateRole(id: number, role: Partial<Role>): Promise<void> {
        try {
            await RoleModel.updateRole(id, role);
        } catch (error: any) {
            throw new Error('Error in RoleService.updateRole: ' + error.message);
        }
    }

    async deleteRole(id: number): Promise<void> {
        try {
            const role = await RoleModel.getRoleById(id);
            if (!role) throw new Error('Role not found');
            await RoleModel.deleteRole(id);
        } catch (error: any) {
            throw new Error('Error in RoleService.deleteRole: ' + error.message);
        }
    }

    async getUsersByRole(id: number): Promise<User[]> {
        try {
            return await RoleModel.getUsersByRole(id);
        } catch (error: any) {
            throw new Error('Error in RoleService.getUsersByRole: ' + error.message);
        }
    }
}

export default new RoleService();

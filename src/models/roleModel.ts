import { connection as db } from '../database/config.ts';
import { User, Role } from '../types'


class RoleModel {
    static async createRole(role: Role): Promise<number> {
        const { name, description, isActive } = role;
        const [result]: any = await db.execute(
            'INSERT INTO role (name, description, isActive) VALUES (?, ?, ?)',
            [name, description, isActive]
        );
        return result.insertId;
    }

    static async getAllRoles(): Promise<Role[]> {
        const [rows]: any = await db.execute('SELECT * FROM role');
        return rows;
    }

    static async getRoleById(id: number): Promise<Role | null> {
        const [rows]: any = await db.execute('SELECT * FROM role WHERE id = ?', [id]);
        return rows[0] || null;
    }

    static async getRoleByName(name: string): Promise<Role | null> {
        const [rows]: any = await db.execute('SELECT * FROM role WHERE name = ?', [name]);
        return rows[0] || null;
    }

    static async updateRole(id: number, role: Partial<Role>): Promise<void> {
        const { name, description, isActive } = role;
        await db.execute(
            'UPDATE role SET name = ?, description = ?, isActive = ? WHERE id = ?',
            [name, description, isActive, id]
        );
    }

    static async deleteRole(id: number): Promise<void> {
        await db.execute('DELETE FROM role WHERE id = ?', [id]);
    }

    static async getUsersByRole(id: number): Promise<User[]> {
        const [rows]: any = await db.execute(
            'SELECT u.id, u.username, u.email FROM user u JOIN role r ON u.role_id = r.id WHERE r.id = ?',
            [id]
        );
        return rows;
    }
}

export default RoleModel;

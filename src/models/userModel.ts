import { connection } from '../database/config.ts';
import { User, Role } from '../types'
class UserModel {
    async getAllUsers(): Promise<User[]> {
        try {
            const [rows] = await connection.execute('SELECT * FROM user');
            return rows as User[];
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            const [rows] = await connection.execute('SELECT * FROM role');
            return rows as Role[];
        } catch (error) {
            throw new Error('Error fetching roles: ' + error.message);
        }
    }

    async getUserById(id: number): Promise<User | undefined> {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
            return rows[0] as User;
        } catch (error) {
            throw new Error('Error fetching user by ID: ' + error.message);
        }
    }

    async createUser(user: User): Promise<number> {
        try {
            const { name, email, password, gender, age, username, salt, role_id } = user;
            const [result] = await connection.execute(
                'INSERT INTO user (name, email, password, gender, age, username, salt, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [name, email, password, gender, age, username, salt, role_id]
            );
            return (result as any).insertId;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        try {
            const { name, email, password, gender, age, salt, resetToken, resetTokenExpiration } = user;
            const [result] = await connection.execute(
                'UPDATE user SET name = ?, email = ?, password = COALESCE(?, password), gender = ?, age = ?, salt = COALESCE(?, salt), resetToken = ?, resetTokenExpiration = ? WHERE id = ?',
                [name, email, password, gender, age, salt, resetToken, resetTokenExpiration, id]
            );
            return (result as any).affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const [result] = await connection.execute('DELETE FROM user WHERE id = ?', [id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    async getUserByUserName(username: string): Promise<User | undefined> {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);
            return rows[0] as User;
        } catch (error) {
            throw new Error('Error fetching user by username: ' + error.message);
        }
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
            return rows[0] as User;
        } catch (error) {
            throw new Error('Error fetching user by email: ' + error.message);
        }
    }

    async updateResetToken(id: number, restToken: string, resetTokenExpiration: Date): Promise<boolean> {
        try {
            const [result] = await connection.execute(
                'UPDATE user SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?',
                [restToken, resetTokenExpiration, id]
            );
            return (result as any).affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating reset token: ' + error.message);
        }
    }

    async updatePassword(id: number, password: string, salt: string): Promise<boolean> {
        try {
            const [result] = await connection.execute(
                'UPDATE user SET password = ?, salt = ? WHERE id = ?',
                [password, salt, id]
            );
            return (result as any).affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating password: ' + error.message);
        }
    }

    async getUserByResetToken(resetToken: string): Promise<User | undefined> {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE resetToken = ?', [resetToken]);
            return rows[0] as User;
        } catch (error) {
            throw new Error('Error fetching user by reset token: ' + error.message);
        }
    }
}

export default new UserModel();

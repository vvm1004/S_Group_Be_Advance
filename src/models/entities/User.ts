import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from './Role.ts';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'tinyint' })
    gender: number;

    @Column({ type: 'int', nullable: true })
    age: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    username: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    salt: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    resetToken: string;

    @Column({ type: 'datetime', nullable: true })
    resetTokenExpiration: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
      name: 'user_roles', 
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },
    })
    roles: Role[];
}

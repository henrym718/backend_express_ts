import { UserEntity } from "@User/infraestructure/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "roles" })
export class RolesEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50 })
    name!: string;

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users!: UserEntity[];
}

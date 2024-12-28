import { RolesEntity } from "@Role/infraestructure/roles.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 50 })
    name!: string;

    @Column({ type: "varchar", length: 50 })
    lastName!: string;

    @Column({ type: "varchar", length: 100 })
    email!: string;

    @Column({ type: "varchar", length: 50 })
    password!: string;

    @Column({ type: "bool" })
    active!: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => RolesEntity, (role) => role.users)
    @JoinTable()
    roles!: RolesEntity[];
}

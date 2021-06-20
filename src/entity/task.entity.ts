import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Users } from "./user.entity";
import { Boards } from "./board.entity";
import { Columns } from "./column.entity";

@Entity()
export class Tasks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("text", { unique: true })
    externalId: string = '';

    @Column("text")
    title: string = '';

    @Column("int")
    order: number = 0;

    @Column("text")
    description: string = '';

    @OneToOne(() => Users, {nullable: true, onDelete: "SET NULL"})
    user!: Users;

    @OneToOne(() => Boards, {nullable: true, onDelete: "SET NULL"})
    board!: Boards;

    @OneToOne(() => Columns, {nullable: true, onDelete: "SET NULL"})
    column!: Columns;
}
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Columns } from "./column.entity";

@Entity()
export class Boards extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("text")
    externalId: string = '';

    @Column("text")
    title: string = '';

    @OneToMany(
        () => Columns,
        columns => columns.board,
        {
            nullable: true,
        })
    columns!: Columns[];
}

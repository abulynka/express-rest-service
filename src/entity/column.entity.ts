import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Boards } from "./board.entity";

@Entity()
export class Columns extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("text", { unique: true })
    externalId: string = '';

    @Column("text")
    title: string = '';

    @Column("text")
    order: number = 0;

    @ManyToOne(
        () => Boards,
        board => board.columns,
        {
            onDelete: "CASCADE",
        })
    board: Boards | undefined;
}
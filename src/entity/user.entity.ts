import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("text")
    externalId: string = '';

    @Column("text")
    name: string = '';

    @Column("text")
    login: string = '';

    @Column("text")
    password: string = '';
}
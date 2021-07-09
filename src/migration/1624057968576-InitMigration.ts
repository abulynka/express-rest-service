import { MigrationInterface, QueryRunner, Table } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { Crypt } from '../common/crypt';

export class InitMigration1624057968576 implements MigrationInterface {

    // eslint-disable-next-line class-methods-use-this
    public async up(queryRunner: QueryRunner): Promise<void> {
        // boards
        await queryRunner.createTable(new Table({
            name: "boards",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "externalId",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "title",
                    type: "varchar",
                },
            ]
        }), true);

        // columns
        await queryRunner.createTable(new Table({
            name: "columns",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "externalId",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "order",
                    type: "int",
                },
                {
                    name: "boardId",
                    type: "int",
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["boardId"],
                    referencedTableName: "boards",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                    onUpdate: "NO ACTION",
                },
            ],
        }), true);

        // users
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "externalId",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
            ],
        }), true);

        // tasks
        await queryRunner.createTable(new Table({
            name: "tasks",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "externalId",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "order",
                    type: "int",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "boardId",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "columnId",
                    type: "int",
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["userId"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                },
                {
                    columnNames: ["boardId"],
                    referencedTableName: "boards",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                },

                {
                    columnNames: ["columnId"],
                    referencedTableName: "columns",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                },
            ],
        }), true);

        // insert admin user with password
        await queryRunner.query(`
            INSERT
              INTO users ( "externalId", name, login, password )
            VALUES ( $1, 'admin', 'admin',  $2)`,
            [
                uuidv4(),
                await Crypt.hash('admin'),
            ]
        );
    }

    // eslint-disable-next-line class-methods-use-this
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS boards CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS columns CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS tasks CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE`);
    }
}

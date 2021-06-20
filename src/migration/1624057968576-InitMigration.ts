import {MigrationInterface, QueryRunner, Table} from "typeorm";

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
            indices: [{columnNames: ["boardId"]}],
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
            indices: [{columnNames: ["userId", "boardId", "columnId"]}],
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
    }

    // eslint-disable-next-line class-methods-use-this
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS boards CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS columns CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS tasks CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE`);
    }
}

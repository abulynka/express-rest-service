import { Connection, getConnection } from "typeorm";

export class LoginRepository {
    private connection: Connection | null = null;

    private connect() {
        if (!this.connection) {
            this.connection = getConnection();
        }
    };

    public async getPassword(login: string): Promise<string> {
        this.connect();

        const result = await this.connection!
            .getRepository("users")
            .query(`SELECT password FROM users WHERE "login" = $1`, [login]);

        if (result && result.length === 1) {
            return result[0].password;
        }

        throw new Error('unknown user');
    }

    public async getExternalId(login: string): Promise<string> {
        this.connect();

        const result = await this.connection!
            .getRepository("users")
            .query(`SELECT "externalId" FROM users WHERE "login" = $1`, [login]);

        if (result && result.length === 1) {
            return result[0].externalId;
        }

        throw new Error('unknown user');
    }

    public async checkForValidData(externalId: string, login: string): Promise<boolean> {
        this.connect();

        const result = await this.connection!
            .getRepository("users")
            .query(`SELECT 1 AS exists FROM users WHERE "externalId" = $1 AND login = $2`, [externalId, login]);

        if (result && result.length === 1) {
            return result[0].exists === 1;
        }

        return false;
    }
}
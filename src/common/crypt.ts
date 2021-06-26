import { hash, compare } from 'bcrypt';

export class Crypt {
    public static async hash(pass: string): Promise<string> {
        return hash(pass, 10);
    }

    public static async compare(pass: string, passHashed: string): Promise<boolean> {
        return compare(pass, passHashed);
    }
}
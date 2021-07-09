import jwt from 'jsonwebtoken';
import { TokenInterface } from './token';

export class JWT {
    public static generateJWT(userId: string, login: string): string {
        return jwt.sign(
            {
                userId,
                login,
            },
            `${ process.env['JWT_SECRET_KEY'] }`
        );
    }

    public static authorize(token: string): TokenInterface {
        return jwt.verify(token, `${ process.env['JWT_SECRET_KEY'] }`) as TokenInterface;
    }
}
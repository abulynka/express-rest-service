import * as dotenv from "dotenv";

export class AuthSecret {
    private static secretKey = 'secret-key-test';

    public static getSecret() {
        const result = dotenv.config();

        if (result.error) {
          throw result.error;
        }

        if (result.parsed && result.parsed['JWT_SECRET_KEY']) {
            AuthSecret.secretKey = result.parsed['JWT_SECRET_KEY'];
        }
        
        console.log(AuthSecret.secretKey);
        return AuthSecret.secretKey;
    }
}

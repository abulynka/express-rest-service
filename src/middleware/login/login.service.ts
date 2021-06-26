import { LoginRepository } from "./login.repository";
import { Crypt } from '../../common/crypt';
import { JWT } from '../../common/jwt';

export class LoginService {
    private loginRepository: LoginRepository;

    public constructor() {
        this.loginRepository = new LoginRepository();
    }

    public async checkForValidLogin(login: string, password: string): Promise<boolean> {
        return Crypt.compare(password, await this.loginRepository.getPassword(login));
    }

    public async checkForValidToken(token: string): Promise<boolean> {
        const data = JWT.authorize(token);
        return this.loginRepository.checkForValidData(data.userId, data.login);
    }

    public async getExternalId(login: string): Promise<string> {
        return this.loginRepository.getExternalId(login);
    }
}
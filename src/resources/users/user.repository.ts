import { Connection, getConnection } from "typeorm";
import { Users as UserEntity } from "../../entity/user.entity";
import { User } from "./user.model";
import { Exception } from '../../common/exception';

export class UserRepository {
    private connection: Connection;

    constructor() {
        this.connection = getConnection();
    };

    private static toUser(entity: UserEntity): User {
        return new User({
            id: entity.externalId,
            name: entity.name,
            login: entity.login,
            password: entity.password,
        });
    };

    public async getAll(): Promise<User[]> {
        const users: User[] = [];
        (await this.connection.getRepository(UserEntity).find()).forEach(
            (entity) => {
                users.push(UserRepository.toUser(entity));
            }
        );
        return users;
    };

    public async add(user: User): Promise<User> {
        const userEntity = new UserEntity();

        userEntity.externalId = user.id;
        userEntity.name = user.name;
        userEntity.login = user.login;
        userEntity.password = user.password;

        await this.connection.getRepository(UserEntity).save(userEntity);
        return user;
    };

    public async get(id: string): Promise<User> {
        const userEntity = await this.connection.getRepository(UserEntity).findOne({externalId: id});

        if (!userEntity) {
            throw new Exception(Exception.STATUS_NOT_FOUND, `unknown user id ${ id }`);
        }

        return UserRepository.toUser(userEntity);
    };

    public async update(id: string, params: { [key: string]: string; }): Promise<User> {
        await this.connection.getRepository(UserEntity).update(
            {
                externalId: id,
            },
            {
                name: params['name'],
                login: params['login'],
                password: params['password'],
            }
        );
        return this.get(id);
    };

    public async remove(id: string): Promise<void> {
        await this.get(id);
        await this.connection.getRepository(UserEntity).delete({externalId: id});
    };
}
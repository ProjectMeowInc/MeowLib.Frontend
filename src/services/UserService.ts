import {IUpdateUserInfoRequest} from './models/requests/UserRequests';
import {IUser} from "./models/entities/UserModels";
import {Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";

/**
 * Сервис для работы с пользователем.
 */
export class UserService {

    /**
     * Метод для получения всех пользователей
     * @returns Возвращает ошибку или массив с пользователями
     */
    static async getUsersAsync(): Promise<Result<IUser[]>> {

        const result = await new HttpRequest<IUser[]>()
            .withUrl("/users")
            .withAuthorization()
            .withGetMethod()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }

    /**
     * Метод для обновления информации о пользователе
     * @param id пользователя
     * @param data информация пользователя
     * @returns Возвращает IUserDTO или IError
     */
    static async updateUserAsync(id: number, data: IUpdateUserInfoRequest): Promise<Result<IUser>> {

        const result = await new HttpRequest<IUser>()
            .withUrl(`/users/${id}`)
            .withBody(data)
            .withPutMethod()
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }
}
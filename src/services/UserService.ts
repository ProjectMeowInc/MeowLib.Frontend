import axios from "axios"
import {IUpdateUserInfoRequest} from './models/requests/IUserRequests';
import {ErrorService} from "./ErrorService";
import {IUserDTO} from "./models/DTO/IUserModels";
import {TokenService} from "./TokenService";
import {Result} from "./result/Result";

/**
 * Сервис для работы с пользователем.
 */
export class UserService {

    /**
     * Метод для получения всех пользователей
     * @returns Возвращает ошибку или массив с пользователями
     */
    static async getUsersAsync(): Promise<Result<IUserDTO[]>> {
        try {
            const response = await axios.get<IUserDTO[]>(process.env.REACT_APP_URL_API + "/users")

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "UserService"))
        }
    }

    /**
     * Метод для обновления информации о пользователе
     * @param id пользователя
     * @param data информация пользователя
     * @returns Возвращает IUserDTO или IError
     */
    static async updateUserAsync(id: number, data: IUpdateUserInfoRequest): Promise<Result<IUserDTO>> {
        try {
            const response = await axios.put<IUserDTO>(process.env.REACT_APP_URL_API + `/users/${id}`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                        .then(result => result.unwrap())
                }
            })

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "UserService"))
        }
    }
}
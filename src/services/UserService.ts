import axios from "axios"
import {IUpdateUserInfoRequest} from './models/requests/IUserRequests';
import {IError} from "./models/IError";
import {ErrorService} from "./ErrorService";
import {IUserDTO} from "./models/DTO/IUserModels";
import {TokenService} from "./TokenService";

/**
 * Сервис для работы с пользователем.
 */
export class UserService {

    /**
     * Метод для получения всех пользователей
     * @returns Возвращает ошибку или массив с пользователями
     */
    static async getUsers(): Promise<IUserDTO[] | IError> {
        try {
            const response = await axios.get<IUserDTO[]>(process.env.REACT_APP_URL_API + "/users")

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "UserService")
        }
    }

    /**
     * Метод для обновления информации о пользователе
     * @param id пользователя
     * @param data нформация мольхлователя
     * @returns Возвращает IUserDTO или IError
     */
    static async updateUser(id: number, data: IUpdateUserInfoRequest): Promise<IUserDTO | IError> {
        try {
            const response = await axios.put<IUserDTO>(process.env.REACT_APP_URL_API + `/users/${id}`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "UserService")
        }
    }
}
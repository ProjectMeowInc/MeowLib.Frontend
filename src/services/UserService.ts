import axios from "axios"
import {ILogInRequest, ISignInRequest, IUpdateUserInfoRequest} from './models/requests/IUserRequests';
import {IError} from "./models/IError";
import {ILoginResponse} from "./models/responses/IUserResponses";
import {ErrorService} from "./ErrorService";
import {IUserDTO} from "./models/DTO/IUserModels";
import {TokenService} from "./TokenService";

/**
 * Сервис для работы с пользователем.
 */
export class UserService {
    /**
     * Метод для регистрации пользователя
     * @param requestData Данные для регистрации.
     * @returns Ошибку или если её нет null
     */
    static async registration (requestData: ISignInRequest): Promise<IError | null> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + "/users/sign-in", requestData)

            // Если не попали в блок catch - ошибку возвращать не нужно
            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "UserService")
        }
    }

    /**
     * Метод для авторизации пользователя
     * @param requestData Данные для авторизации.
     * @returns Возвращает ошибку или два токена
     */
    static async authorization (requestData: ILogInRequest): Promise<IError | ILoginResponse> {
        try {
            const response = await axios.post<ILoginResponse>(process.env.REACT_APP_URL_API + "/users/log-in", requestData)

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "UserService")
        }
    }

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
                    Authorization: TokenService.getAccessToken()
                }
            })

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "UserService")
        }
    }
}
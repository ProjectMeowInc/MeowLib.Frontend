import axios, {AxiosError} from "axios"
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse"
import {ILogInRequest, ISignInRequest} from './models/requests/IUserRequests';
import {ErrorService} from "./ErrorService";
import {IError} from "./models/IError";
import {ILoginResponse} from "./models/responses/IUserResponses";

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
            await axios.post("http://localhost:5270/api/users/sign-in",
                requestData)
                
            // Если не попали в блок catch - ошибку возвращать не нужно
            return null
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const baseErrorResponse = err as AxiosError<IBaseErrorResponse>
                
                // Если ошибка не приводиться к виду IBaseErrorResponse даже с учётом того, что ошибка - isAxiosError 
                // возвращаем фатальную ошибку
                if (baseErrorResponse === null) {
                    return ErrorService.criticalError("Неизвестная ошибка. Попробуйте ещё раз.")
                }
    
                // Если ответ - пустой возвращаем фатальную ошибку.
                if (baseErrorResponse.response === undefined) {
                    return ErrorService.criticalError("Неизвестная ошибка. Попробуйте ещё раз.")
                }

                // Если смогли привести к нужному нам виду - можем работать с ней    
                return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
            }
            // Если ошибка - не isAxiosError
            // возвращаем фатальную ошибку
            return ErrorService.criticalError("Неизвестная ошибка. Попробуйте ещё раз.")
        }
    }

    /**
     * Метод для авторизации пользователя
     * @param requestData Данные для авторизации.
     * @returns Возвращает ошибку или два токена
     */
    static async authorization (requestData: ILogInRequest): Promise<IError | ILoginResponse> {
        try {
            const response = await axios.post<ILoginResponse>("http://localhost:5270/api/users/log-in", requestData)

            return response.data
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

                if (baseErrorResponse === null) {
                    return ErrorService.criticalError("Неизвестная ошибка. Попробуйте ещё раз.")
                }

                if (baseErrorResponse.response === undefined) {
                    return ErrorService.criticalError("Неизвестная ошибка. Попробуйте ещё раз.")
                }

                return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
            }

            return ErrorService.criticalError("Неизвестная ошибка. Попробуйте ещё раз.")
        }
    }
}
import axios, { AxiosError } from "axios"
import { IBaseErrorResponse } from "./models/responses/errors/IBaseErrorResponse"
import { ISignInRequest } from './models/requests/IUserRequests';
import { ErrorService } from "./ErrorService";
import { IError } from "./models/IError";

/**
 * Сервис для работы с пользователем.
 */
export class UserService {
    /**
     * 
     * @param requestData Данные для регистрации.
     * @returns 
     */
    static async registration(requestData: ISignInRequest): Promise<IError | null> {
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
                if (baseErrorResponse.response == undefined) {
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
}
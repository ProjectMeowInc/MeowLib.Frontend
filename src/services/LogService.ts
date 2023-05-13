import {ISendLogRequest} from "./models/requests/ISendLogRequest";
import {IError} from "./models/IError";
import axios, {AxiosError} from "axios";
import {TokenService} from "./TokenService";
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse";
import {ErrorService} from "./ErrorService";

/**
 * Сервис для логирования в тг
 */
export class LogService {

    /**
     * Метод для логирования в тг
     * @param data тело ошибки
     * @returns null при успехе или ошибка
     */
    static async sendLog(data: ISendLogRequest): Promise<IError | null> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + "/logs", data, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const error = err as AxiosError<IBaseErrorResponse>

                if (error === null) {
                    return ErrorService.criticalError()
                }

                if (error.response === undefined) {
                    return ErrorService.criticalError()
                }

                return ErrorService.commonError(error.response.data.errorMessage)
            }
            return ErrorService.criticalError()
        }
    }
}
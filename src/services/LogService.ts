import {ISendLogRequest} from "./models/requests/ISendLogRequest";
import axios from "axios";
import {TokenService} from "./TokenService";
import {ErrorService} from "./ErrorService";
import {EmptyResult} from "./result/Result";

/**
 * Сервис для логирования в тг
 */
export class LogService {

    /**
     * Метод для логирования в тг
     * @param data тело ошибки
     * @returns null при успехе или ошибка
     */
    static async sendLogAsync(data: ISendLogRequest): Promise<EmptyResult> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + "/logs", data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "LogService"))
        }
    }
}

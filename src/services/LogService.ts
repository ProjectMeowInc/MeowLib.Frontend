import {ISendLogRequest} from "./models/requests/ISendLogRequest";
import {IError} from "./models/IError";
import axios from "axios";
import {TokenService} from "./TokenService";
import {AxiosExtend} from "./AxiosExtend";

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
            return AxiosExtend.returnErrorFromServices(err)
        }
    }
}
import {ISendLogRequest} from "./models/requests/ISendLogRequest";
import {EmptyResult} from "./result/Result";
import HttpRequest from "./http/HttpRequest";

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

        const request = HttpRequest.create<void>()
            .withUrl("/logs")
            .withAuthorization()
            .withBody(data)

        const result = await request.sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }
}

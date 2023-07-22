import {SendLogRequest} from "./models/requests/SendLogRequest";
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
    static async sendLogAsync(data: SendLogRequest): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl("/logs")
            .withAuthorization()
            .withBody(data)
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }
}

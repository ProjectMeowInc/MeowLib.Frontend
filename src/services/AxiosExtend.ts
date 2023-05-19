import {AxiosError} from "axios";
import {IError} from "./models/IError";
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse";
import {ErrorService} from "./ErrorService";

export class AxiosExtend extends AxiosError {

    /**
     * Метод для обработки ошибок в запросах
     * @param err ошибка запроса
     * @returns ошибку типа IError
     */
    static returnErrorFromServices(err: any): IError {
        if (err.isAxiosError) {
            const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

            if (baseErrorResponse === null) {
                return ErrorService.criticalError()
            }

            if (baseErrorResponse.response === undefined) {
                return ErrorService.criticalError()
            }

            return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
        }

        return ErrorService.criticalError()
    }
}
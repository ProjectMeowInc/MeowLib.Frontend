import axios, {AxiosError} from "axios";
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse";
import {ErrorService} from "./ErrorService";
import {IError} from "./models/IError";
import {IGetAuthorsResponse} from "./models/responses/IAuthorResponse";
import {IAuthorDTO} from "./models/DTO/IAuthorModels";

/**
 * Сервис для работы с авторами
 */

export class AuthorServices {

    /**
     * Метод для получения списка авторов
     * @returns Возвращает массив объектов типа IAuthorDTO
     */

    static async getAuthors (): Promise<IGetAuthorsResponse | IError> {
        try {
            const response = await axios.get<IAuthorDTO[]>("http://localhost:5270/api/authors")

            return {
                data: response.data
            }
        } catch (err: any) {

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

    /**
     *
     * @param data Данные для запроса
     * @param token Токен пользователя
     * @returns null При успешном срабатывании
     */

    static async createAuthor (data: string, token: string): Promise<IError | null> {
        try {

            await axios.post("https://localhost:7007/api/authors", {
                name: data
            }, {
                headers: {
                    Authorization: token
                }
            })

            return null
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

    /**
     * TODO: Сделать методы для обновления и удаления автора
     */
}

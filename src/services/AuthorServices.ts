import axios, {AxiosError} from "axios";
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse";
import {ErrorService} from "./ErrorService";
import {IError} from "./models/IError";
import {IGetAuthorsResponse} from "./models/responses/IAuthorResponse";
import {IAuthorDTO} from "./models/DTO/IAuthorModels";
import {TokenService} from "./TokenService";

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

            //Сортировка авторов для вывода от большего к меньшему

            const sortedAuthors = response.data.sort((a, b) => b.id - a.id)

            return {
                data: sortedAuthors,
            }
        } catch (err: any) {

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

    /**
     * Метод для обнавления имени автора
     * @param id автора
     * @param name Имя автора
     * @returns Ошибку типа IError или null
     */

    static async updateAuthor (id: number, name: string): Promise<IError | null> {
        try {
            await axios.put(`https://localhost:7007/api/authors/${id}`, {
                name: name
            }, {
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

    static async deleteAuthor(id: number): Promise<IError | null> {
        try {
            await axios.delete(`https://localhost:7007/api/authors/${id}`, {
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
import axios from "axios";
import {IError} from "./models/IError";
import {IGetAuthorsResponse} from "./models/responses/IAuthorResponse";
import {IAuthorDTO} from "./models/DTO/IAuthorModels";
import {TokenService} from "./TokenService";
import {ICreateAuthorRequest, ISearchAuthorRequest} from "./models/requests/IAuthorRequests";
import {ErrorService} from "./ErrorService";
import {EmptyResult, Result} from "./result/Result";

/**
 * Сервис для работы с авторами
 */
export class AuthorServices {

    /**
     * Метод для получения списка авторов
     * @returns Возвращает массив объектов типа IAuthorDTO
     */
    static async getAuthorsAsync(): Promise<Result<IAuthorDTO[]>> {
        try {
            const response = await axios.get<IAuthorDTO[]>(process.env.REACT_APP_URL_API + "/authors")

            //Сортировка авторов для вывода от большего к меньшему

            const sortedAuthors = response.data.sort((a, b) => b.id - a.id)

            return Result.ok(sortedAuthors)
        } catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err,"AuthorService"))
        }
    }

    /**
     * Метод для получения автора
     * @param id автора
     * @returns данные типа IAuthorDTO или ошибку типа IError
     */
    static async getAuthorAsync(id: number): Promise<Result<IAuthorDTO>> {
        try {
            const response = await axios.get<IAuthorDTO>(process.env.REACT_APP_URL_API + `/authors/${id}`)

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err,"AuthorService"))
        }
    }

    /**
     * Метод для создания автора
     * @param data Данные для запроса
     * @returns null При успешном срабатывании
     */
    static async createAuthorAsync(data: ICreateAuthorRequest): Promise<EmptyResult> {
        try {

            await axios.post(process.env.REACT_APP_URL_API + "/authors", data , {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "AuthorService"))
        }
    }

    /**
     * Метод для обновления информации об авторе
     * @param id автора
     * @param name Имя автора
     * @returns Ошибку типа IError или null
     */

    static async updateAuthorAsync(id: number, name: string): Promise<EmptyResult> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/authors/${id}`, {
                name: name
            }, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "AuthorService"))
        }
    }

    /**
     * Метод для удаления автора
     * @param id автора
     * @returns Ошибку или null
     */
    static async deleteAuthorAsync(id: number): Promise<EmptyResult> {
        try {
            await axios.delete(process.env.REACT_APP_URL_API + `/authors/${id}`, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "AuthorService"))
        }
    }

    /**
     * Метод для поиска авторов по имени
     * @param data имя / часть имени автора
     * @returns Массив из IAuthorDTO или ошибку в формате IError
     */
    static async searchAuthorWithParamsAsync(data: ISearchAuthorRequest): Promise<Result<IAuthorDTO[]>> {
        try {
            const response = await axios.post(process.env.REACT_APP_URL_API + "/authors/get-with-params", data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "AuthorService"))
        }
    }
}

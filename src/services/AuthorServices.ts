import axios from "axios";
import {IError} from "./models/IError";
import {IGetAuthorsResponse} from "./models/responses/IAuthorResponse";
import {IAuthorDTO} from "./models/DTO/IAuthorModels";
import {TokenService} from "./TokenService";
import {ICreateAuthorRequest, ISearchAuthorRequest} from "./models/requests/IAuthorRequests";
import {ErrorService} from "./ErrorService";

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
            const response = await axios.get<IAuthorDTO[]>(process.env.REACT_APP_URL_API + "/authors")

            //Сортировка авторов для вывода от большего к меньшему

            const sortedAuthors = response.data.sort((a, b) => b.id - a.id)

            return {
                data: sortedAuthors,
            }
        } catch (err: any) {
            return ErrorService.toServiceError(err,"AuthorService")
        }
    }

    /**
     * Метод для получения автора
     * @param id автора
     * @returns данные типа IAuthorDTO или ошибку типа IError
     */
    static async getAuthor(id: number): Promise<IAuthorDTO| IError> {
        try {
            const response = await axios.get<IAuthorDTO>(process.env.REACT_APP_URL_API + `/authors/${id}`)

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "AuthorService")
        }
    }

    /**
     * Метод для создания автора
     * @param data Данные для запроса
     * @returns null При успешном срабатывании
     */
    static async createAuthor (data: ICreateAuthorRequest): Promise<IError | null> {
        try {

            await axios.post(process.env.REACT_APP_URL_API + "/authors", data , {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err,"AuthorService")
        }
    }

    /**
     * Метод для обнавления информации об авторе
     * @param id автора
     * @param name Имя автора
     * @returns Ошибку типа IError или null
     */

    static async updateAuthor (id: number, name: string): Promise<IError | null> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/authors/${id}`, {
                name: name
            }, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "AuthorService")
        }
    }

    /**
     * Метод для удаления автора
     * @param id автора
     * @returns Ошибку или null
     */
    static async deleteAuthor(id: number): Promise<IError | null> {
        try {
            await axios.delete(process.env.REACT_APP_URL_API + `/authors/${id}`, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "AuthorService")
        }
    }

    /**
     * Метод для поиска авторов по имнени
     * @param data имя / часть имени автора
     * @returns Массив из IAuthorDTO или ошибку в формате IError
     */
    static async searchAuthorWithParams(data: ISearchAuthorRequest): Promise<IAuthorDTO[] | IError> {
        try {
            const response = await axios.post(process.env.REACT_APP_URL_API + "/authors/get-with-params", data, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "AuthorService")
        }
    }
}
import {IError} from "./models/IError";
import {IBook} from "./models/DTO/IBookDTO";
import axios from "axios";
import {TokenService} from "./TokenService";
import {ErrorService} from "./ErrorService";
import {IBooksResponse} from "./models/responses/IBookResponse";
import {ICreateBookRequest, IUpdateBookRequest} from "./models/requests/IBookRequests";

/**
 * Сервис для работы с книгами
 */
export class BookService {

    /**
     * Метод для получения всех книг
     * @return массив из книг или IError
     */
    static async getBooks(): Promise<IBooksResponse | IError> {
        try {
            const response = await axios.get<IBooksResponse>(process.env.REACT_APP_URL_API + "/books", {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "BookService")
        }
    }

    /**
     * Метод для получения книги по id
     * @param id id книги
     * @returns книгу в виде IBook или ошибку в виде IError
     */
    static async getBookAsync(id: number): Promise<IBook | IError> {
        try {
            const response = await axios.get<IBook>(process.env.REACT_APP_URL_API + `/books/${id}`)

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "BookService")
        }
    }

    /**
     * Метод для созадния книги
     * @param data данные книги
     * @returns IError или null
     */
    static async createBook(data: ICreateBookRequest): Promise<IError | null> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + "/books", data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "BookService")
        }
    }

    /**
     * Метод для удаления книги
     * @param id книги
     * @returns IError или null
     */
    static async deleteBook(id: number): Promise<IError | null> {
        try {
            await axios.delete(process.env.REACT_APP_URL_API + `/books/${id}`, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "BookService")
        }
    }

    /**
     * Метод для обновлении информации о книге
     * @param id книги
     * @param data новые данные книги
     * @returns IError или null
     */
    static async updateBook(id: number, data: IUpdateBookRequest): Promise<IError | null> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/books/${id}/info`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "BookService")
        }
    }
}

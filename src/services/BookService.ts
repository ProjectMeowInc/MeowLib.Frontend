import {IError} from "./models/IError";
import {IBook} from "./models/DTO/IBookDTO";
import axios from "axios";
import {TokenService} from "./TokenService";
import {ErrorService} from "./ErrorService";
import {IBooksResponse} from "./models/responses/IBookResponse";
import {ICreateBookRequest, IUpdateBookRequest, IUpdateBookTagsRequest} from "./models/requests/IBookRequests";
import {EmptyResult, Result} from "./result/Result";

/**
 * Сервис для работы с книгами
 */
export class BookService {

    /**
     * Метод для получения всех книг
     * @return массив из книг или IError
     */
    static async getBooksAsync(): Promise<Result<IBooksResponse>> {
        try {
            const response = await axios.get<IBooksResponse>(process.env.REACT_APP_URL_API + "/books", {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "BookService"))
        }
    }

    /**
     * Метод для получения книги по id
     * @param id id книги
     * @returns книгу в виде IBook или ошибку в виде IError
     */
    static async getBookAsync(id: number): Promise<Result<IBook>> {
        try {
            const response = await axios.get<IBook>(process.env.REACT_APP_URL_API + `/books/${id}`)

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "BookService"))
        }
    }

    /**
     * Метод для создания книги
     * @param data данные книги
     * @returns IError или null
     */
    static async createBookAsync(data: ICreateBookRequest): Promise<IError | null> {
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
    static async deleteBookAsync(id: number): Promise<IError | null> {
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
     * Метод для обновления информации о книге
     * @param id книги
     * @param data новые данные книги
     * @returns IError или null
     */
    static async updateBookAsync(id: number, data: IUpdateBookRequest): Promise<EmptyResult> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/books/${id}/info`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "BookService"))
        }
    }

    /**
     * Метод для добавления автора книги
     * @param bookId id книги
     * @param authorId id автора
     * @returns IError или null
     */
    static  async updateBookAuthorAsync(authorId: number, bookId: number): Promise<IError | null> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/books/${bookId}/author/${authorId}`,{}, {
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
     * Метод для добавления тегов для книги
     * @param bookId id книги
     * @param tags массив из id тегов
     * @returns IError или null
     */
    static async updateTagsBookAsync(bookId: number, tags: IUpdateBookTagsRequest): Promise<IError | null> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/books/${bookId}/tags`, tags, {
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
     * Метод для обновления обложки книги
     * @param bookId id книги
     * @param image изображение в виде formData
     * @returns IError или null
     */
    static async uploadImageBookAsync(bookId: number, image: FormData): Promise<IError | null> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/books/${bookId}/image`, image, {
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

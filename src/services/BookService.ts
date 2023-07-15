import {IBook, IBookDTO} from "./models/DTO/IBookDTO";
import {IBooksResponse} from "./models/responses/IBookResponse";
import {ICreateBookRequest, IUpdateBookRequest, IUpdateBookTagsRequest} from "./models/requests/IBookRequests";
import {EmptyResult, Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";

/**
 * Сервис для работы с книгами
 */
export class BookService {

    /**
     * Метод для получения всех книг
     * @return массив из книг или IError
     */
    static async getBooksAsync(): Promise<Result<IBookDTO[]>> {
        const result = await HttpRequest.create<IBooksResponse>()
            .withUrl("/books")
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return Result.withError(error)
        }

        return Result.ok(result.unwrap().items)
    }

    /**
     * Метод для получения книги по id
     * @param id id книги
     * @returns книгу в виде IBook или ошибку в виде IError
     */
    static async getBookAsync(id: number): Promise<Result<IBook>> {

        const result = await new HttpRequest<IBook>()
            .withUrl(`/books/${id}`)
            .withGetMethod()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }

    /**
     * Метод для создания книги
     * @param data данные книги
     * @returns IError или null
     */
    static async createBookAsync(data: ICreateBookRequest): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl("/books")
            .withAuthorization()
            .withPostMethod()
            .withBody(data)
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError();
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для удаления книги
     * @param id книги
     * @returns IError или null
     */
    static async deleteBookAsync(id: number): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl(`/books/${id}`)
            .withAuthorization()
            .withDeleteMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для обновления информации о книге
     * @param id книги
     * @param data новые данные книги
     * @returns IError или null
     */
    static async updateBookAsync(id: number, data: IUpdateBookRequest): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl( `/books/${id}/info`)
            .withBody(data)
            .withAuthorization()
            .withPutMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для добавления автора книги
     * @param bookId id книги
     * @param authorId id автора
     * @returns IError или null
     */
    static  async updateBookAuthorAsync(authorId: number, bookId: number): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl( `/books/${bookId}/author/${authorId}`)
            .withAuthorization()
            .withPutMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для добавления тегов для книги
     * @param bookId id книги
     * @param tags массив из id тегов
     * @returns IError или null
     */
    static async updateTagsBookAsync(bookId: number, tags: IUpdateBookTagsRequest): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl( `/books/${bookId}/tags`)
            .withBody(tags)
            .withAuthorization()
            .withPutMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для обновления обложки книги
     * @param bookId id книги
     * @param image изображение в виде formData
     * @returns IError или null
     */
    static async uploadImageBookAsync(bookId: number, image: FormData): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl(`/books/${bookId}/image`)
            .withBody(image)
            .withAuthorization()
            .withPutMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }
}

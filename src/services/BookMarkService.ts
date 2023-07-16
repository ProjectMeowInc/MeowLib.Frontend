import {EmptyResult, Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";
import {IBookMarkDTO} from "./models/DTO/IBookMarkDTO";

/**
 * Написан сервис для работы с закладками
 */
export class BookMarkService {

    /**
     * Метод для добавления закладки
     * @param chapterId id главы
     */
    static async addBookMarkAsync(chapterId: number): Promise<EmptyResult> {
        const result = await new HttpRequest<void>()
            .withUrl("/users/bookmark")
            .withBody({chapterId: chapterId})
            .withPostMethod()
            .withAuthorization()
            .sendAsync()
        
        if (result.hasError()) {
            return EmptyResult.withError(result.getError())
        }
        
        return EmptyResult.ok()
    }

    /**
     * Метод для получения закладки
     * @param bookId id книги
     */
    static async getBookMarksAsync(bookId: number): Promise<Result<IBookMarkDTO>> {
        const result = await new HttpRequest<IBookMarkDTO>()
            .withUrl(`/users/bookmarks/book/${bookId}`)
            .withGetMethod()
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }
}
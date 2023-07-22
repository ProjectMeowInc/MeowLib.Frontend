import {EmptyResult, Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";
import {IBookmark} from "./models/entities/BookmarkModels";

/**
 * Написан сервис для работы с закладками
 */
export class BookmarkService {

    /**
     * Метод для добавления закладки
     * @param chapterId id главы
     */
    static async addBookmarkAsync(chapterId: number): Promise<EmptyResult> {
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
    static async getBookmarkByBookIdAsync(bookId: number): Promise<Result<IBookmark>> {
        const result = await new HttpRequest<IBookmark>()
            .withUrl(`/users/bookmark/book/${bookId}`)
            .withGetMethod()
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }
}
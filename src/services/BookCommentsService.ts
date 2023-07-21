import {IBookCommentsDto} from "./models/entities/BookCommentsModels";
import HttpRequest from "./http/HttpRequest";
import {IGetBookCommentsResponse} from "./models/responses/BookResponse";
import {EmptyResult, Result} from "./result/Result";

/**
 * Написан класс для работы с комментариями книги
 */
export class BookCommentsService {

    /**
     * Метод для получения всех комментариев
     * @param bookId id книги
     */
    static async getBookCommentsAsync(bookId: number): Promise<Result<IBookCommentsDto[]>> {
        const result = await new HttpRequest<IGetBookCommentsResponse>()
            .withUrl(`/books/${bookId}/comments`)
            .withGetMethod()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        const comments = result.unwrap().items

        const domainComments = comments.map(comment => ({
            ...comment,
            postedAt: new Date(comment.postedAt)
        }))

        return Result.ok(domainComments)
    }

    /**
     * Метод для создания комментария
     * @param bookId id книги
     * @param text содержимое комментария
     */
    static async addBookCommentAsync(bookId: number, text: string): Promise<EmptyResult> {
        const result = await new HttpRequest<void>()
            .withUrl(`/books/${bookId}/comments`)
            .withBody({text: text})
            .withPostMethod()
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            return EmptyResult.withError(result.getError())
        }

        return EmptyResult.ok()
    }
}
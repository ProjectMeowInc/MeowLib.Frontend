import {IBookCommentsDto} from "./models/entities/BookCommentsModels";
import HttpRequest from "./http/HttpRequest";
import {IGetBookCommentsResponse} from "./models/responses/BookResponse";
import {Result} from "./result/Result";
import {IAddBookCommentResponse} from "./models/responses/IAddBookCommentResponse";

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

        const domainComments: IBookCommentsDto[] = comments.map(comment => ({
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
    static async addBookCommentAsync(bookId: number, text: string): Promise<Result<IBookCommentsDto>> {
        const result = await new HttpRequest<IAddBookCommentResponse>()
            .withUrl(`/books/${bookId}/comments`)
            .withBody({text: text})
            .withPostMethod()
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        const comment = result.unwrap()

        const domainComment: IBookCommentsDto = {
            ...comment,
            postedAt: new Date(comment.postedAt)
        }

        return Result.ok(domainComment)
    }
}
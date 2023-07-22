import {ICreateChapterRequest, IUpdateChapterTextRequest} from "./models/requests/ChapterRequests";
import {IChapter, IChapterDto} from "./models/entities/ChapterModels";
import {EmptyResult, Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";
import {IGetChaptersResponse} from "./models/responses/ChapterResponses";

/**
 * Сервис для работы с главами
 */
export class ChapterService {

    /**
     * Метод для создания глав
     * @param id id книги
     * @param data данные необходимые для создания главы
     */
    static async createChapterAsync(id: number, data: ICreateChapterRequest): Promise<EmptyResult> {
        const result = await HttpRequest.create<void>()
            .withUrl(`/books/${id}/chapters`)
            .withPostMethod()
            .withAuthorization()
            .withBody(data)
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для получения списка книг
     * @param bookId id книги
     * @returns IGetChapters или IError
     */
    static async getChaptersAsync(bookId: number): Promise<Result<IChapterDto[]>> {

        const result = await HttpRequest.create<IGetChaptersResponse>()
            .withUrl(`/books/${bookId}/chapters`)
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return Result.withError(error)
        }

        const chapters = result.unwrap()

        const domainChapters: IChapterDto[] = chapters.items.map(chapter => ({
            ...chapter,
            releaseDate: new Date(chapter.releaseDate)
        }))

        return Result.ok(domainChapters)
    }

    /**
     * Метод для обновления текста главы
     * @param bookId id книги
     * @param chapterId id главы
     * @param data данные необходимые для обновления книги
     * @returns IError или null
     */
    static async updateChapterTextAsync(bookId: number, chapterId: number, data: IUpdateChapterTextRequest): Promise<EmptyResult>  {

        const result = await HttpRequest.create<void>()
            .withUrl(`/books/${bookId}/chapters/${chapterId}/text`)
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
     * Метод для удаления главы
     * @param bookId id книги
     * @param chapterId id главы
     * @returns IError или null
     */
    static async deleteChapterAsync(bookId: number, chapterId: number): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl(`/books/${bookId}/chapters/${chapterId}`)
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
     * Метод для получения главы
     * @param bookId id книги
     * @param chapterId id главы
     * @returns IChapter или null
     */
    static async getChapterAsync(bookId: number, chapterId: number): Promise<Result<IChapter>> {

        const result = await new HttpRequest<IChapter>()
            .withUrl(`/books/${bookId}/chapters/${chapterId}`)
            .withGetMethod()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }
}
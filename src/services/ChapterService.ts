import {ICreateChapterRequest, IUpdateChapterTextRequest} from "./models/requests/IChapterRequests";
import {ErrorService} from "./ErrorService";
import axios from "axios";
import {TokenService} from "./TokenService";
import {IGetChaptersResponse} from "./models/responses/IChapterResponses";
import {IChapter, IChapterDTO} from "./models/DTO/IChapterDTO";
import {EmptyResult, Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";

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
        const request = HttpRequest.create<void>()
            .withUrl(`/books/${id}/chapters`)
            .withPostMethod()
            .withAuthorization()
            .withBody(data)

        const result = await request.sendAsync()

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
    static async getChaptersAsync(bookId: number): Promise<Result<IChapterDTO[]>> {
        try {

            const request = HttpRequest.create<IGetChaptersResponse>()
                .withUrl(`/books/${bookId}/chapters`)
                .withAuthorization()

            const result = await request.sendAsync()

            if (result.hasError()) {
                const error = result.getError()
                return Result.withError(error)
            }

            const chapters = result.unwrap().items

            return Result.ok(chapters)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "ChapterService"))
        }
    }

    /**
     * Метод для обновления текста главы
     * @param bookId id книги
     * @param chapterId id главы
     * @param data данные необходимые для обновления книги
     * @returns IError или null
     */
    static async updateChapterTextAsync(bookId: number, chapterId: number, data: IUpdateChapterTextRequest): Promise<EmptyResult>  {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/books/${bookId}/chapters/${chapterId}/text`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "ChapterService"))
        }
    }

    /**
     * Метод для удаления главы
     * @param bookId id книги
     * @param chapterId id главы
     * @returns IError или null
     */
    static async deleteChapterAsync(bookId: number, chapterId: number): Promise<EmptyResult> {
        try {
            await axios.delete(process.env.REACT_APP_URL_API + `/books/${bookId}/chapters/${chapterId}`, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "ChapterService"))
        }
    }

    /**
     * Метод для получения главы
     * @param bookId id книги
     * @param chapterId id главы
     * @returns IChapter или null
     */
    static async getChapterAsync(bookId: number, chapterId: number): Promise<Result<IChapter>> {
        try {
            const response = await axios.get<IChapter>(process.env.REACT_APP_URL_API + `/books/${bookId}/chapters/${chapterId}`)

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "ChapterService"))
        }
    }
}
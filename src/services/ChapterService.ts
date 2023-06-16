import {IError} from "./models/IError";
import {ICreateChapterRequest, IUpdateChapterRequest} from "./models/requests/IChapterRequests";
import {ErrorService} from "./ErrorService";
import axios from "axios";
import {TokenService} from "./TokenService";
import {IGetChapters} from "./models/responses/IChapterResponses";

/**
 * Сервис для работы с главами
 */
export class ChapterService {

    /**
     * Метод для создания глав
     * @param id id книги
     * @param data данные необходимые для создания главы
     */
    static async createChapterAsync(id: number, data: ICreateChapterRequest): Promise<IError | null> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + `/books/${id}/chapters`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return null;
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "ChapterService")
        }
    }

    /**
     * Метод для получения списка книг
     * @param bookId id книги
     * @returns IGetChapters или IError
     */
    static async getChaptersAsync(bookId: number): Promise<IGetChapters | IError> {
        try {
            const response = await axios.get(process.env.REACT_APP_URL_API + `/books/${bookId}/chapters`, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "ChapterService")
        }
    }

    /**
     * Метод для обновления текста главы
     * @param bookId id книги
     * @param chapterId id главы
     * @param data данные необходимые для обновления книги
     * @returns IError или null
     */
    static async updateChapterTextAsync(bookId: number, chapterId: number, data: IUpdateChapterRequest): Promise<IError| null>  {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/books/${bookId}/chapters/${chapterId}/text`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "ChapterService")
        }
    }
}
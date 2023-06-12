import {IError} from "./models/IError";
import {ICreateChapterRequest} from "./models/requests/IChapterRequests";
import {ErrorService} from "./ErrorService";
import axios from "axios";
import {TokenService} from "./TokenService";

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
}
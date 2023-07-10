import axios from "axios";
import {ErrorService} from "./ErrorService";
import {Result} from "./result/Result";

/**
 * Класс для работы с файлами
 */
export class FileService {

    /**
     * Метод для получения изображения
     * @param imageName название картинки
     * @returns string или IError
     */
    static async getBookImageAsync(imageName: string): Promise<Result<string>> {
        try {
            const response = await axios.get(process.env.REACT_APP_URL_API + `/images/book/${imageName}`)

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "FileService"))
        }
    }
}
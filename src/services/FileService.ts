import {IError} from "./models/IError";
import axios from "axios";
import {ErrorService} from "./ErrorService";

/**
 * Класс для работы с файлами
 */
export class FileService {

    /**
     * Метод для получения изображения
     * @param imageName название картинки
     * @returns string или IError
     */
    static async getBookImageAsync(imageName: string): Promise<string | IError> {
        try {
            const response = await axios.get(process.env.REACT_APP_URL_API + `/images/book/${imageName}`)

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "FileService")
        }
    }
}
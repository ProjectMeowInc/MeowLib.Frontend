import {ITagsDTO} from "./models/DTO/ITagsDTO";
import {IError} from "./models/IError";
import axios, {AxiosError} from "axios";
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse";
import {ErrorService} from "./ErrorService";
import {ICreateTagRequest, IUpdateTagRequest} from "./models/requests/ITagRequests";
import {TokenService} from "./TokenService";
import {IGetTagResponse, IGetTagsResponse} from "./models/responses/IGetTagsResponse";

/**
 * Сервис для работы с тэгами
 */
export class TagsService {

    /**
     * Метод для получения списка тэгов
     * @returns данные в виде IGetTagsResponse или ошибку
     */
    static async getAllTags(): Promise<IGetTagsResponse | IError> {
        try {
            const response = await axios.get<ITagsDTO[]>("https://localhost:7007/api/tags")

            return {
                data: response.data
            }
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

                if (baseErrorResponse === null) {
                    return ErrorService.criticalError()
                }

                if (baseErrorResponse.response === undefined) {
                    return ErrorService.criticalError()
                }

                return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
            }

            return ErrorService.criticalError()
        }
    }

    /**
     * Метод для получения информации о одном тэге
     * @param id тэга
     * @returns данные в виде IGetTagResponse или ошибку
     */
    static async getTagById(id: number): Promise<IGetTagResponse | IError> {
        try {
            const response = await axios.get<IGetTagResponse>(`https://localhost:7007/api/tags/${id}`)

            return response.data
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

                if (baseErrorResponse === null) {
                    return ErrorService.criticalError()
                }

                if (baseErrorResponse.response === undefined) {
                    return ErrorService.criticalError()
                }

                return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
            }

            return ErrorService.criticalError()
        }
    }

    /**
     * Метод для создания тега
     * @param data данные о тэге
     * @returns ошибку или null
     */
    static async createTag(data: ICreateTagRequest): Promise<null | IError> {
        try {
            await axios.post("https://localhost:7007/api/tags/", data, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return  null
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

                if (baseErrorResponse === null) {
                    return ErrorService.criticalError()
                }

                if (baseErrorResponse.response === undefined) {
                    return ErrorService.criticalError()
                }

                return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
            }

            return ErrorService.criticalError()
        }
    }

    /**
     * Метод для удаления тега
     * @param id тэга
     * @returns ошибку или null
     */
    static async deleteTag(id: number): Promise<IError | null> {
        try {
            await axios.delete(`https://localhost:7007/api/tags/${id}`,{
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

                if (baseErrorResponse === null) {
                    return ErrorService.criticalError()
                }

                if (baseErrorResponse.response === undefined) {
                    return ErrorService.criticalError()
                }

                return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
            }

            return ErrorService.criticalError()
        }
    }

    /**
     * Метод для удаления тега
     * @param id тэга
     * @param data данные на обновление
     * @returns ошибку или null
     */
    static async updateTag(id: number, data: IUpdateTagRequest): Promise<IError | null> {
        try {
            await axios.put(`https://localhost:7007/api/tags/${id}`, data, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            if (err.isAxiosError) {
                const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

                if (baseErrorResponse === null) {
                    return ErrorService.criticalError()
                }

                if (baseErrorResponse.response === undefined) {
                    return ErrorService.criticalError()
                }

                return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
            }

            return ErrorService.criticalError()
        }
    }
}
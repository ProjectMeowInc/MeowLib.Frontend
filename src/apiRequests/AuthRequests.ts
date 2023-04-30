import axios, {AxiosError} from "axios";
import {IError, IErrorResponse} from "../models/Responses";


export async function registration(login: string, password: string): Promise<IError | undefined> {
    try {
        await axios.post<IErrorResponse>("http://localhost:5270/api/users/sign-in",
            {
                login,
                password
            })
    }
    catch (err: any) {
        if(err.isAxiosError) {
            const axiosError = err as AxiosError<IErrorResponse>
            //TODO: Заменить или обработать
            if(axiosError === null) {
                return undefined
            }

            return {
                displayMessage: axiosError.response?.data.errorMessage ?? "Неизветная ошибка"
            }
        }
        //TODO: Обработать else
        return undefined
    }
}
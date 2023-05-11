import {toast} from "react-toastify";

/**
 * Класс для вывода сообщений пользователю
 */
export class AlertService {
    /**
     * Метод для вывода ошибки
     * @param message сообщение для пользователя
     */
    static errorMessage (message: string) {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        })
    }

    /**
     * Метод для вывода предупреждения
     * @param message сообщение для пользователя
     */
    static warningMessage (message: string) {
        toast.warning(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        })
    }

    /**
     * Метод для уведомления об успешном выполнении
     * @param message сообщение для пользователя
     */
    static successMessage (message: string) {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        })
    }
}
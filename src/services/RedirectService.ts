/**
 * Сервис для редиректа
 */
export class RedirectService {

    /**
     * Метод для редиректа по конкретному пути
     * @param path абсолютный путь для редиректа
     */
    static customRedirect(path: string): void {
        window.location.href = `http://localhost:3000${path}`
    }

    /**
     * Метод для редиректа на страницу авторизации
     */
    static redirectToLogin(): void {
        this.customRedirect("/login")
    }

    /**
     * Метод для обновления страницы
     */
    static reloadPage(): void {
        window.location.reload()
    }
}
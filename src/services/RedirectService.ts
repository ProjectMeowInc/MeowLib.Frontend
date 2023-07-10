/**
 * Сервис для редиректа
 */
export class RedirectService {

    /**
     * Метод для редиректа по конкретному пути
     * @param path абсолютный путь для редиректа
     */
    static redirect(path: string): void {
        window.location.href = `http://localhost:3000${path}`
    }

    /**
     * Метод для редиректа на страницу авторизации
     */
    static redirectToLogin(): void {
        this.redirect("/login")
    }

    /**
     * Метод для обновления страницы
     */
    static reloadPage(): void {
        window.location.reload()
    }

    /**
     * Метод для редиректа с задержкой в 3с
     * @param path путь до страницы
     */
    static delayRedirect(path: string): void {
        setTimeout(() => {
            this.redirect(path)
        }, 3000)
    }

    /**
     * Метод для перезагрузки страницы с задержкой в 3с
     */
    static delayReloadPage(): void {
        setTimeout(() => {
            this.reloadPage()
        }, 3000)
    }

    /**
     * Метод для редиректа на страницу с 404 кодом
     */
    static redirectToNotFoundPage(): void {
        this.redirect("/404")
    }

    /**
     * Метод для редиректа на предидущую страницу с задержкой в 3с
     */
    static delayRedirectToPrevPage(): void {
        setTimeout(() => {
            window.history.back()
        }, 3000)
    }

    /**
     * Метод для получения текущего пути
     */
    static getPath(): string {
        return window.location.pathname
    }
}
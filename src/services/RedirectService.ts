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
}
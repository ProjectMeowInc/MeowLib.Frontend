export class RedirectService {
    static customRedirect(path: string): void {
        window.location.href = `http://localhost:3000${path}`
    }

    static redirectToLogin(): void {
        this.customRedirect("/login");
    }

    static reloadPage(): void {
        window.location.reload()
    }
}
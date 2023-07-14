import {IAccessTokenData} from "./DTO/ITokenModels";
import {UserRoles} from "./UserRoles";

export default class SessionUser {
    private static AdminAccessRoles: UserRoles[] = ["Admin", "Moderator"]

    public id: number
    public login: string
    public role: UserRoles

    constructor(data: IAccessTokenData) {
        this.id = data.id
        this.login = data.login
        this.role = data.userRole
    }

    /**
     * Метод проверяет есть ли у пользователя доступ к админ-панели.
     */
    public hasAdminAccess(): boolean {
        return SessionUser.AdminAccessRoles.includes(this.role)
    }
}
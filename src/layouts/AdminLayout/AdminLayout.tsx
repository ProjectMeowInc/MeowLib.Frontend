import React, {useEffect, useState} from 'react';
import styles from "./adminLayout.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {TokenService} from "../../services/TokenService";
import {UserRolesEnum} from "../../services/models/DTO/IUserModels";
import {AlertService} from "../../services/AlertService";
import {IAccessTokenData} from "../../services/models/DTO/ITokenModels";
import {RedirectService} from "../../services/RedirectService";

const AdminLayout = () => {

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState<IAccessTokenData | null>(null)

    useEffect(() => {

        let accessToken: string;

        async function fetchData(): Promise<void> {
            const result = await TokenService.getAccessToken()

            if (result === null) {
                return
            }

            accessToken = result
        }

        fetchData().then(() => {
            const tokenData = TokenService.parseAccessToken(accessToken)

            if(tokenData === null) {
                AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
                return RedirectService.redirectToLogin()
            }

            if(tokenData.userRole !== UserRolesEnum.Admin && tokenData.userRole !== UserRolesEnum.Moderator) {
                return RedirectService.redirectToLogin()
            }

            setAdminData(tokenData)
        })
    }, [navigate])

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p onClick={() => navigate("/admin")} className={styles.logo}>MeowLib</p>
                    <p className={styles.name}>{adminData && adminData.login}</p>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminLayout;
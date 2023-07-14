import React, {useEffect, useState} from 'react';
import styles from "./adminLayout.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {TokenService} from "../../services/TokenService";
import {AlertService} from "../../services/AlertService";
import {IAccessTokenData} from "../../services/models/DTO/ITokenModels";
import {RedirectService} from "../../services/RedirectService";

const AdminLayout = () => {

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState<IAccessTokenData | null>(null)

    useEffect(() => {

        let accessToken: string;

        async function fetchData(): Promise<void> {
            const getAccessTokenResult = await TokenService.getAccessTokenAsync()

            if (getAccessTokenResult.tryCatchError()) {
                return
            }

            accessToken = getAccessTokenResult.unwrap()
        }

        fetchData().then(() => {
            const accessTokenData = TokenService.parseAccessToken(accessToken)

            if(accessTokenData === null) {
                AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
                return RedirectService.redirectToLogin()
            }

            if(accessTokenData.userRole !== "Admin" && accessTokenData.userRole !== "Moderator") {
                return RedirectService.redirectToLogin()
            }

            setAdminData(accessTokenData)
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
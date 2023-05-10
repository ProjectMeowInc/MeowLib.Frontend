import React, {useEffect, useState} from 'react';
import styles from "./adminLayout.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {TokenService} from "../../services/TokenService";
import {ITokenData, UserRolesEnum} from "../../services/models/DTO/IUserModels";
import {AlertService} from "../../services/AlertService";

const AdminLayout = () => {

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState<ITokenData | null>(null)

    useEffect(() => {
        let token = TokenService.getAccessToken()

        if(token === null) {
            return navigate("/login")
        }

        const tokenData = TokenService.parseToken(token)

        if(tokenData === null) {
            AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
            return navigate("/login")
        }

        if(tokenData.role !== UserRolesEnum.Admin && tokenData.role !== UserRolesEnum.Moderator) {
            //TODO: В будущем сделать редирект на indexPage
            return navigate("/login")
        }

        setAdminData(tokenData)
    }, [navigate])

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.logo}>MeowLib</p>
                    <p className={styles.name}>{adminData && adminData.login}</p>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminLayout;
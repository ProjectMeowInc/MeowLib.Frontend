import React, {useEffect, useState} from 'react';
import styles from "./adminLayout.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {TokenService} from "../../services/TokenService";
import {UserRolesEnum} from "../../services/models/DTO/IUserModels";
import {AlertService} from "../../services/AlertService";
import {ITokenData} from "../../services/models/DTO/ITokenModels";

const AdminLayout = () => {

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState<ITokenData | null>(null)

    let token: string;

    useEffect(() => {

        async function fetchData(): Promise<void> {
            const result = await TokenService.getAccessToken()

            if (result === null) {
                return
            }

            token = result
        }

        fetchData().then(() => {
            const tokenData = TokenService.parseToken(token)

            if(tokenData === null) {
                AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
                return navigate("/login")
            }

            if(tokenData.userRole !== UserRolesEnum.Admin && tokenData.userRole !== UserRolesEnum.Moderator) {
                //TODO: В будущем сделать редирект на indexPage
                return navigate("/login")
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
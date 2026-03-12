'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../_lib/session"
import styles from "../_styles/HeaderMain.module.css";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function LogoutButton({bool}: {bool: boolean}){

    return(
        <form action={logout} className='logoutForm'>
            <button className={`${bool ? styles.loginButton1 : styles.loginButton2}`}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</button>
        </form>
    )
    
}
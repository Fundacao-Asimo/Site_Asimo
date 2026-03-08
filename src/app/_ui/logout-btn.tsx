'use client'

import { logout } from "../_lib/session"
import styles from "../_styles/HeaderMain.module.css";

export default function LogoutButton(){

    return(
        <form action={logout} className='logoutForm'>
            <button className={styles.loginButton}>Logout</button>
        </form>
    )
    
}
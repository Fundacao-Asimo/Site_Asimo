'use client'

import { logout } from "../lib/session"
import styles from "../styles/Header.module.css";

export default function LogoutButton(){

    return(
        <form action={logout} className='logoutForm'>
            <button className={styles.loginButton}>Logout</button>
        </form>
    )
    
}
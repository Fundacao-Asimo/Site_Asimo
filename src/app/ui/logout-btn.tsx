'use server';

import { redirect } from "next/navigation";
import { deleteSessionCookie } from "../lib/session"
import styles from "../styles/Header.module.css";

export default async function LogoutButton(){

    const logout = async () => {
        await deleteSessionCookie();
        redirect('/login');
    }

    return(
        <form action={logout} className='logoutForm'>
            <button className={styles.loginButton}>Logout</button>
        </form>
    )
    
}
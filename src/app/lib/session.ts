'use server';

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


console.log('Valor de process.env.TOKEN em session.ts:', process.env.TOKEN);

async function openSessionToken(token: string){
    
    const encodedKey = new TextEncoder().encode(process.env.TOKEN);

    try{
        const {payload} = await jwtVerify(token, encodedKey, {
        algorithms: ["HS256"],
        });
        return payload;
    }catch(e){
        console.log('Erro ao verificar session token', e);
    }
    
}

export async function createSessionToken(userEmail: string, adm: boolean){
    const encodedKey = new TextEncoder().encode(process.env.TOKEN); 
    const expiresAt = Date.now() + 3600;


    const session = await new SignJWT({userEmail, adm}).setProtectedHeader({
        alg: 'HS256'
    })
    .setExpirationTime('1h') 
    .sign(encodedKey); 

    const cookieStore = await cookies();
    
    cookieStore.set('session', session, {
        expires: expiresAt * 1000,
        path: '/',
        httpOnly: true
    });
}

export async function isSessionValid(){

    const sessionCookie = (await cookies()).get('session');

    if(sessionCookie)
    {
        const {value} = sessionCookie;
        const session = await openSessionToken(value);
        return session;
    }
    return false;
}

export async function deleteSessionCookie(){
    const cookieStore = await cookies();

    cookieStore.delete('session');
}

export async function logout() {
        await deleteSessionCookie();
        redirect('/login');
    }
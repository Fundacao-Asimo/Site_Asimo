'use server';

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function openSessionToken(token: string){
    
    const encodedKey = new TextEncoder().encode(process.env.TOKEN);

    try{
        const {payload} = await jwtVerify(token, encodedKey, {
        algorithms: ["HS256"],
        });
        return payload;
    }catch(e){
        console.log('Erro ao verificar session token', e);
        await deleteSessionCookie();
        return false;
    }
    
}

export async function createSessionToken(userId: number, isAdm: boolean){
    const encodedKey = new TextEncoder().encode(process.env.TOKEN); 
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);


    const session = await new SignJWT({userId, isAdm}).setProtectedHeader({
        alg: 'HS256'
    })
    .setExpirationTime('1h') 
    .sign(encodedKey); 

    const cookieStore = await cookies();
    
    cookieStore.set('session', session, {
        expires: expiresAt,
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
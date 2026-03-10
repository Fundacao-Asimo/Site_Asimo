import { isSessionValid } from "@/app/_lib/session";
import {NextRequest, NextResponse} from "next/server";

//regex retirada diretamente da documentação do NextJS
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

const publicRoutes = [
    '/',
    '/login'
];

const admRoutes = [
    "/main/dashboard-principal",
    "/main/free-time-geral",
    "/main/escolas-parceiras",
    "/main/agenda-reunioes",
    "/main/controle-frequência",
    "/main/eventos",
    "/main/relatorios-horas",
    "/main/controle-membros",
    "/main/controle-atividades",
    "/main/caixa",
    "/main/advertencias",
]

export async function middleware(req: NextRequest){

    const pathname = req.nextUrl.pathname;

    //verificar se a requisicao possui credenciais validas para criar uma session
    const session = await isSessionValid();
    const isAdm = session as {isAdm: boolean};

    if(publicRoutes.includes(pathname) && session) {
        return NextResponse.redirect(new URL('/main', req.nextUrl));
    }
    
    if(!session && !publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if(admRoutes.some(route => pathname.includes(route)) && !(isAdm.isAdm)) {
        return NextResponse.redirect(new URL('/main', req.nextUrl));
    }
    
    return NextResponse.next();
      

}
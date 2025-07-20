import Agenda from "@/app/ui/agenda";
import DadosPessoais from "@/app/ui/dados-pessoais";
import FreeTime from "@/app/ui/free-time";
import HorariosPessoais from "@/app/ui/horarios-pessoais";
import MainUsers from "@/app/ui/main-users";
import Tools from "@/app/ui/tools";

export default function MainPage({params}: {params: {caminho: string}}) {
    const {caminho} = params;

    switch(caminho) {
        case 'dados-pessoais':
            return(<DadosPessoais/>);
        case 'horarios-pessoais':
            return(<HorariosPessoais/>);
        case 'free-time':
            return(<FreeTime/>);
        case 'agenda':
            return(<Agenda/>);
        case 'tools':
            return(<Tools/>);
        default:
            return(<MainUsers/>);
    }
}
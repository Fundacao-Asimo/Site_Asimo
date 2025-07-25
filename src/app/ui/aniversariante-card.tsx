import Image from "next/image";
import { AniversarianteProps } from "../main/page";

export default function AniversarianteCard(props: AniversarianteProps) {
    return(
        <div className={}>
            <Image src={props.foto} alt="Foto do membro aniversariante"/>
            <h2>{props.dia}/ {props.nick}</h2>
        </div>
    );
}
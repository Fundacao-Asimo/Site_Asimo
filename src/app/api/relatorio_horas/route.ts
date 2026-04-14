import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { list_user } from "@/app/_actions/user";
import { list_horas_geral } from "@/app/_actions/hora";
import { descriptografar_cpf } from "@/app/_actions/cripto";

function formatHoras(horas: number) {
    const totalSegundos = horas * 3600;

    const h = String(Math.floor(totalSegundos / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSegundos % 3600) / 60)).padStart(2, "0");
    const s = String(totalSegundos % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
}

export async function GET() {
    const membros = await list_user();
    const horas = await list_horas_geral();

    // Agrupar horas por membro
    const horasPorMembro: Record<number, number> = {};

    horas.forEach((h) => {
        if (h.aprovado === true) {
            if (!horasPorMembro[h.membro]) {
                horasPorMembro[h.membro] = 0;
            }
            horasPorMembro[h.membro] += h.horas;
        }
    });

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 750;

    // Título
    page.drawText(
        "Relatório de membros e carga horária",
        { x: 50, y, size: 16, font }
    );

    y -= 20;

    page.drawText(
        "(Contabilizadas de 01/01/2025 até 11/08/2025):",
        { x: 50, y, size: 10, font }
    );

    y -= 40;

    for (const membro of membros) {
        const horasTotal = horasPorMembro[membro.id] || 0;

        page.drawText(membro.nome_completo, {
            x: 50,
            y,
            size: 12,
            font,
        });

        y -= 15;

        page.drawText(`Matrícula: ${membro.matricula}`, { x: 50, y, size: 10, font });
        y -= 12;

        page.drawText(`CPF: ${await descriptografar_cpf(membro.cpf)}`, { x: 50, y, size: 10, font });
        y -= 12;

        page.drawText(`E-mail: ${membro.email}`, { x: 50, y, size: 10, font });
        y -= 12;

        page.drawText(`Função: ${membro.adm ? "Administrador" : "Voluntário"}`, {
            x: 50,
            y,
            size: 10,
            font,
        });

        y -= 12;

        // ⚠️ como não tem sexo/formação no seu tipo, deixei fixo
        page.drawText(`Sexo: Não informado`, { x: 50, y, size: 10, font });
        y -= 12;

        page.drawText(`Formação: ${membro.curso || "Não informado"}`, {
            x: 50,
            y,
            size: 10,
            font,
        });

        y -= 12;

        page.drawText(`Carga Horária: ${formatHoras(horasTotal)}`, {
            x: 50,
            y,
            size: 10,
            font,
        });

        y -= 25;

        // Evitar overflow
        if (y < 80) {
            page = pdfDoc.addPage([600, 800]); // ✅ atualiza a página
            y = 750;
        }
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=relatorio_horas.pdf",
        },
    });
}
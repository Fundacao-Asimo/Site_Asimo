import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { query_caixa } from "@/app/_actions/caixa";
import { list_trans } from "@/app/_actions/transacao";

export async function GET() {
    const caixa = await query_caixa();
    const transacoes = await list_trans(true);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 750;

    // Título
    page.drawText("Relatório Financeiro", {
        x: 50,
        y,
        size: 18,
        font,
    });

    y -= 40;

    // Saldo
    page.drawText(`Saldo atual: R$ ${caixa.valor}`, {
        x: 50,
        y,
        size: 12,
        font,
    });

    y -= 30;

    // Transações
    for (const t of transacoes) {
        page.drawText(
            `${t.data} - ${t.descricao} - R$ ${t.valor}`,
            {
                x: 50,
                y,
                size: 10,
                font,
            }
        );

        y -= 20;

        if (y < 50) break; // evita overflow
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=relatorio.pdf",
        },
    });
}
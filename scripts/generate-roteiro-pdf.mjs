import { readFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const raw = await readFile(join(root, "data", "roteiro.json"), "utf8");
const roteiro = JSON.parse(raw);

const dist = join(root, "dist");
await mkdir(dist, { recursive: true });
const outPath = join(dist, "roteiro.pdf");

const doc = new PDFDocument({
  size: "A4",
  margin: 50,
  info: {
    Title: `Roteiro — ${roteiro.titulo}`,
    Author: "Thomaz e Joana",
  },
});

const stream = (await import("node:fs")).createWriteStream(outPath);
doc.pipe(stream);

const left = doc.page.margins.left;
const contentW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
const bottomLimit = doc.page.height - doc.page.margins.bottom;

function ensureSpace(needed = 40) {
  if (doc.y + needed > bottomLimit) doc.addPage();
}

function sectionTitle(text) {
  ensureSpace(36);
  doc.moveDown(0.6);
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#3d3428").text(text.toUpperCase());
  doc.moveDown(0.25);
}

function bulletList(items) {
  doc.font("Helvetica").fontSize(9.5).fillColor("#333");
  for (const item of items) {
    ensureSpace(16);
    doc.text(`• ${item}`, { indent: 6, width: contentW - 6, lineGap: 2 });
  }
}

function timeline(itens) {
  doc.font("Helvetica").fontSize(9.5).fillColor("#333");
  for (const item of itens) {
    ensureSpace(18);
    const label = item.opcional ? `${item.hora} — ${item.descricao} (opcional)` : `${item.hora} — ${item.descricao}`;
    doc.text(label, { width: contentW, lineGap: 2 });
  }
}

doc.font("Helvetica-Bold").fontSize(16).fillColor("#3d3428");
doc.text(roteiro.titulo.toUpperCase(), { width: contentW, align: "center" });
doc.moveDown(0.35);
doc.font("Helvetica").fontSize(11).fillColor("#444");
doc.text(`${roteiro.data} – ${roteiro.diaSemana}`, { width: contentW, align: "center" });
doc.moveDown(0.5);
doc.font("Helvetica-Bold").fontSize(10).text(`${roteiro.cerimonia.tipo} – ${roteiro.cerimonia.hora}h`, { align: "center" });
doc.font("Helvetica").fontSize(10).text(roteiro.cerimonia.local, { align: "center" });
doc.text(`Recepção – ${roteiro.recepcao.local}`, { align: "center" });

sectionTitle("Observações gerais");
bulletList(roteiro.observacoesGerais);

for (const secao of roteiro.secoes) {
  sectionTitle(secao.titulo);
  timeline(secao.itens);
}

sectionTitle("Informações a preencher");
const labels = {
  padrinhos: "Padrinhos",
  paisNoivo: "Pais do noivo",
  paisNoiva: "Pais da noiva",
  daminhasPajens: "Daminhas e pajens",
  cerimonial: "Cerimonial",
  fotografia: "Fotografia",
  filmagem: "Filmagem",
};
doc.font("Helvetica").fontSize(9.5).fillColor("#333");
for (const [key, label] of Object.entries(labels)) {
  ensureSpace(20);
  const value = roteiro.informacoesPreencher[key]?.trim();
  doc.text(`${label}: ${value || "_______________________________"}`, { width: contentW });
}

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

console.log(`PDF gerado: ${outPath}`);

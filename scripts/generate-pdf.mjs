import { readFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function loadJson(name) {
  const raw = await readFile(join(root, "data", name), "utf8");
  return JSON.parse(raw);
}

function wrapParagraph(doc, text, x, y, width, lineGap = 4) {
  doc.text(text, x, y, { width, align: "left", lineGap });
  return doc.y;
}

const evento = await loadJson("evento.json");
const igreja = await loadJson("igreja.json");
const buffet = await loadJson("buffet.json");
const presentes = await loadJson("presentes.json");

const dist = join(root, "dist");
await mkdir(dist, { recursive: true });
const outPath = join(dist, "convite.pdf");

const doc = new PDFDocument({
  size: "A5",
  margin: 48,
  info: {
    Title: `Convite — ${evento.noivos.noivo} e ${evento.noivos.noiva}`,
    Author: `${evento.noivos.noivo} e ${evento.noivos.noiva}`,
  },
});

const stream = (await import("node:fs")).createWriteStream(outPath);
doc.pipe(stream);

const left = doc.page.margins.left;
const contentW = doc.page.width - doc.page.margins.left - doc.page.margins.right;

// Ornamental top
doc.save();
doc.moveTo(left, 36).lineTo(left + contentW, 36).strokeColor("#8B7355").lineWidth(0.8).stroke();
doc.restore();

doc.font("Times-Bold").fontSize(22).fillColor("#3d3428");
doc.text(evento.titulo, left, 52, { width: contentW, align: "center" });

doc.moveDown(0.3);
doc.font("Times-Italic").fontSize(13).fillColor("#5c5346");
doc.text(`${evento.noivos.noivo}  &  ${evento.noivos.noiva}`, {
  width: contentW,
  align: "center",
});

doc.moveDown(0.6);
doc.font("Times-Roman").fontSize(11).fillColor("#444");
doc.text(evento.mensagem, left, doc.y, { width: contentW, align: "center", lineGap: 3 });

doc.moveDown(1);
doc.font("Times-Bold").fontSize(12).fillColor("#3d3428").text("Cerimônia", { underline: true });
doc.moveDown(0.25);
doc.font("Times-Bold").fontSize(10.5).fillColor("#333").text(igreja.nome);
if (igreja.instagramHandle) {
  doc.font("Times-Italic").fontSize(9.5).fillColor("#555").text(igreja.instagramHandle);
}
doc.font("Times-Roman").fontSize(10.5).fillColor("#333");
doc.text(`Data: ${evento.dataCerimonia}  ·  Horário: ${evento.horaCerimonia}`);
wrapParagraph(doc, igreja.endereco, doc.x, doc.y, contentW);
doc.fillColor("#6a5a45").fontSize(9).text(igreja.mapsUrl, { link: igreja.mapsUrl, underline: true });

doc.moveDown(0.85);
doc.font("Times-Bold").fontSize(12).fillColor("#3d3428").text("Recepção", { underline: true });
doc.moveDown(0.25);
doc.font("Times-Roman").fontSize(10.5).fillColor("#333");
doc.text(buffet.nome);
wrapParagraph(doc, buffet.endereco, doc.x, doc.y, contentW);
doc.fillColor("#6a5a45").fontSize(9).text(buffet.mapsUrl, { link: buffet.mapsUrl, underline: true });

doc.moveDown(0.85);
doc.font("Times-Bold").fontSize(12).fillColor("#3d3428").text("Presentes & participação", { underline: true });
doc.moveDown(0.25);
doc.font("Times-Roman").fontSize(10).fillColor("#333");
wrapParagraph(doc, presentes.intro, doc.x, doc.y, contentW);
for (const op of presentes.opcoes) {
  doc.moveDown(0.35);
  doc.font("Times-Bold").text(op.titulo);
  doc.font("Times-Roman");
  if (op.itens) op.itens.forEach((item) => doc.text(`• ${item}`, { indent: 8 }));
  if (op.texto) wrapParagraph(doc, op.texto, doc.x, doc.y, contentW);
}
doc.moveDown(0.4);
doc.font("Times-Italic").fontSize(10).text(presentes.fechamento, { width: contentW, align: "center" });

doc.moveDown(0.9);
doc.font("Times-Bold").fontSize(11).fillColor("#3d3428").text("Confirmar presença", { align: "center" });
doc.moveDown(0.2);
doc.font("Times-Roman").fontSize(9.5).fillColor("#444");
wrapParagraph(doc, evento.rsvp.descricao, left, doc.y, contentW);
doc.fillColor("#2a623d").font("Times-Roman").fontSize(9).text(evento.rsvp.url, {
  align: "center",
  link: evento.rsvp.url,
  underline: true,
});

// Bottom rule
const bottomY = doc.page.height - doc.page.margins.bottom - 4;
doc.save();
doc.moveTo(left, bottomY).lineTo(left + contentW, bottomY).strokeColor("#8B7355").lineWidth(0.6).stroke();
doc.restore();

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

console.log(`PDF gerado: ${outPath}`);

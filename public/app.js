async function loadJson(name) {
  const res = await fetch(`./data/${name}`);
  if (!res.ok) throw new Error(`Falha ao carregar ${name}`);
  return res.json();
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (el) el.href = url;
}

try {
  const [evento, igreja, buffet, presentes] = await Promise.all([
    loadJson("evento.json"),
    loadJson("igreja.json"),
    loadJson("buffet.json"),
    loadJson("presentes.json"),
  ]);

  setText("tagline", evento.mensagem);
  setText(
    "datetime",
    `Cerimônia: ${evento.dataCerimonia} · ${evento.horaCerimonia}. Detalhes da recepção podem ser confirmados no RSVP.`
  );

  setText("church-name", igreja.nome);
  setText("church-desc", igreja.descricao);
  setText("church-address", igreja.endereco);
  setHref("church-maps", igreja.mapsUrl);
  setHref("church-insta", igreja.instagramUrl);

  setText("buffet-name", buffet.nome);
  setText("buffet-desc", buffet.descricao);
  setText("buffet-address", buffet.endereco);
  setHref("buffet-maps", buffet.mapsUrl);
  setHref("buffet-insta", buffet.instagramUrl);

  setText("gifts-intro", presentes.intro);
  const ul = document.getElementById("gifts-list");
  ul.innerHTML = "";
  for (const op of presentes.opcoes) {
    if (op.itens) {
      for (const item of op.itens) {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      }
    }
    if (op.texto) {
      const li = document.createElement("li");
      li.textContent = `${op.titulo}: ${op.texto}`;
      ul.appendChild(li);
    }
  }
  setText("gifts-foot", presentes.fechamento);

  setText("rsvp-text", evento.rsvp.descricao);
  setHref("rsvp-btn", evento.rsvp.url);
} catch (e) {
  console.error(e);
  setText(
    "tagline",
    "Não foi possível carregar os dados. Rode `npm run sync` na raiz do projeto e abra o site com um servidor local (ex.: npx serve public)."
  );
}

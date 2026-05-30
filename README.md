# Casamento — Thomaz e Joana

🌐 **GitHub Pages:** [thomazdiniz.github.io/casamento](https://thomazdiniz.github.io/casamento/)

Projeto para centralizar informações do casamento, gerar um convite em PDF e uma página web com link para confirmação de presença (RSVP).

## Estrutura

| Caminho | Uso |
|--------|-----|
| `data/evento.json` | Nomes, data/hora (quando definir), link do Google Forms para RSVP |
| `data/igreja.json` | Cerimônia na Paróquia Santo Antônio de Lisboa (Tambaú) |
| `data/buffet.json` | Recepção no Sal e Brasa João Pessoa (Cabo Branco) |
| `data/presentes.json` | Texto da lista de presentes e/ou PIX — prioriza a mensagem de que a presença é o principal |
| `data/roteiro.json` | Cronograma do dia (cerimônia, fotos, recepção) — usado no PDF |
| `data/roteiro.md` | Mesmo roteiro em Markdown, para ler e revisar com facilidade |
| `public/` | Site estático (abra `index.html` no navegador ou sirva com qualquer servidor estático) |
| `scripts/generate-pdf.mjs` | Gera `dist/convite.pdf` a partir dos JSON |
| `scripts/generate-roteiro-pdf.mjs` | Gera `dist/roteiro.pdf` (cronograma operacional) |

## Sobre os lugares

- **Paróquia Santo Antônio de Lisboa** — Igreja no Tambaú, próxima à orla; ambiente familiar para a cerimônia. Instagram [@psaltambau](https://www.instagram.com/psaltambau/).
- **Sal e Brasa João Pessoa** — Churrascaria na Av. Cabo Branco, boa para grupo grande após a missa/cerimônia. Instagram [salebrasa.joaopessoa](https://www.instagram.com/salebrasa.joaopessoa/).

## RSVP (Google Forms)

1. Crie um formulário no Google Forms com as perguntas que precisar (nome, acompanhante, restrições alimentares, etc.).
2. Copie o link de envio e cole em `data/evento.json` no campo `rsvp.url`.
3. Rode `npm run sync` para atualizar `public/data/evento.json` e o botão do site passará a usar o novo link automaticamente.

## Gerar o PDF (convite)

Requer [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run pdf
```

O arquivo sai em `dist/convite.pdf`. Edite os JSON em `data/` antes de gerar.

Para o roteiro do dia (cerimonial, fotógrafos, etc.):

```bash
npm run pdf:roteiro
```

Gera `dist/roteiro.pdf` a partir de `data/roteiro.json`. Leia ou edite o texto em `data/roteiro.md`.

## Site local rápido

Copie os JSON para a pasta do site (necessário para o navegador carregar `data/*.json`):

```bash
npm run sync
npx --yes serve public
```

Abra o endereço indicado no terminal. Sempre que alterar arquivos em `data/`, rode `npm run sync` de novo.

## Próximos passos sugeridos

Detalhes em `checklist.md`.

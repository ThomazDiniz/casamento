# Casamento — Thomaz e Joana

🌐 **GitHub Pages:** [thomazdiniz.github.io/casamento](https://thomazdiniz.github.io/casamento/)
📋 **Lista de Convidados:** [thomazdiniz.github.io/casamento/convidados.html](https://thomazdiniz.github.io/casamento/convidados.html)

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
| `public/` | Site estático (abra `index.html` no navegador) |
| `convidados.html` | Página de gestão da lista de convidados (dashboard + filtros + adição inline) |
| `convidados.json` | Lista de convidados — **substitua este arquivo** para atualizar a lista; ao abrir `convidados.html` os dados são mesclados automaticamente com o que estiver salvo no navegador |

## Sobre os lugares

- **Paróquia Santo Antônio de Lisboa** — Igreja no Tambaú, próxima à orla; ambiente familiar para a cerimônia. Instagram [@psaltambau](https://www.instagram.com/psaltambau/).
- **Sal e Brasa João Pessoa** — Churrascaria na Av. Cabo Branco, boa para grupo grande após a missa/cerimônia. Instagram [salebrasa.joaopessoa](https://www.instagram.com/salebrasa.joaopessoa/).

## RSVP (Google Forms)

1. Crie um formulário no Google Forms com as perguntas que precisar (nome, acompanhante, restrições alimentares, etc.).
2. Copie o link de envio e cole em `data/evento.json` no campo `rsvp.url`.

## Site local rápido

Basta abrir `index.html` diretamente no navegador. Para imprimir qualquer página, use **Ctrl+P** / **Cmd+P** direto do navegador.

## Próximos passos sugeridos

Detalhes em `checklist.md`.

# Checklist do casamento

Use este arquivo como lembrete; marque conforme for concluindo.

## Dados e convites

- [x] Definir data e horário da cerimônia e atualizar `data/evento.json` *(10/10/2026, 09:00)*
- [x] Roteiro inicial do dia em `data/roteiro.json` e `data/roteiro.md`
- [ ] Preencher nomes em **Informações a preencher** (padrinhos, pais, fornecedores) no roteiro
- [ ] Revisar horários do roteiro com igreja, cerimonial e buffet
- [ ] Criar Google Form de RSVP e colar o link em `data/evento.json` e em `public/index.html`
- [ ] Preencher lista de presentes ou chave PIX em `data/presentes.json`
- [ ] Gerar PDF final: `npm run pdf` e roteiro: `npm run pdf:roteiro`
- [ ] Enviar convite (PDF, link do site ou ambos)

## Cerimônia (igreja)

- [ ] Confirmar horário e celebrante com a paróquia
- [ ] Documentação civil e eclesiástica em dia
- [ ] Ensaio / orientação do casal (se a paróquia oferecer)
- [ ] Música, leituras e detalhes da liturgia

## Recepção (buffet)

- [ ] Contrato, cardápio e número de convidados fechados
- [ ] Mesa de doces / bolo (se for à parte)
- [ ] Acessibilidade e cadeiras especiais, se necessário

## Site e comunicação

- [ ] Hospedar `public/` (GitHub Pages, Netlify, Vercel, etc.) — opcional
- [ ] Testar o link do Forms em celular e desktop
- [ ] Fotógrafo, vídeo, padrinhos — alinhar divulgação no site se quiser uma página “Padrinhos”

## Dia do evento

- [ ] Imprimir ou compartilhar `dist/roteiro.pdf` com cerimonial, fotografia e filmagem
- [ ] Cronograma do dia impresso ou no celular
- [ ] Contatos de fornecedores à mão
- [ ] Kit de emergência (costura, remédios, etc.)

---

*Última organização: arquivos em `data/` são a fonte da verdade para o gerador de PDF.*

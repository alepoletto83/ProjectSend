# ProjectSend

App pessoal de controle de treino de escalada com insights via Claude CLI.

## Objetivo

Atingir as seguintes metas de escalada:
- **V5** no Mini Moonboard 2025 (garagem)
- **V6** outdoor
- **2x V5** outdoor

## Stack

- **Frontend**: Next.js (App Router)
- **DB**: SQLite (better-sqlite3) — single-user local
- **CLI**: integração com Claude para insights sobre os treinos
- **Auth**: single-user local (por enquanto)

## Equipamento disponível

- Mini Moonboard 2025 (garagem)
- Beastmaker 1000 (hangboard)
- Tension Block (pickups do chão)
- Kettlebell até 40lbs
- 2x Dumbbells até 27lbs cada
- Acesso ao Ground Up (Squamish)
- Outdoor em Squamish quando o tempo permite

## Restrições de agenda

- BJJ: terça e quinta (às vezes sexta)
- Disponível para escalada/força: seg, qua, sáb, dom (sex condicional)

## Roadmap inicial

1. README + scope (este commit)
2. Schema SQLite (sessões, exercícios, grades, mood, fadiga)
3. Setup Next.js + rotas básicas
4. UI de log de sessão
5. CLI `projectsend insight` — análise de tendências
6. Gamificação (XP, streaks, milestones por grade)

## Status

Em desenvolvimento — estudo diário com commits incrementais.

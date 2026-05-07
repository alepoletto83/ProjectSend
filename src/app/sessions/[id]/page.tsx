// =============================================================================
// Página: /sessions/[id]  (detalhe de uma sessão)
// =============================================================================
// Conceitos novos:
//
//   1. Segmento dinâmico: a pasta `[id]` vira um parâmetro de rota.
//      URL /sessions/42  →  params = { id: "42" }
//      O `id` SEMPRE chega como string (vem da URL).
//
//   2. No Next 16, `params` é uma `Promise<{ id: string }>` — precisa
//      `await`. Em versões antigas era um objeto síncrono; mudaram pra
//      permitir streaming/parallel rendering. Por isso o componente tem
//      que ser `async`.
//
//   3. notFound() de "next/navigation": quando a sessão não existe,
//      chame essa função. Ela LANÇA uma exceção que o Next captura e
//      renderiza um 404. Não precisa de `return notFound()` — o tipo
//      é `never`, TS entende.
// =============================================================================

import Link from 'next/link';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

type Session = {
  id: number;
  date: string;
  type: string;
  location: string | null;
  duration_min: number | null;
  rpe: number | null;
  completion_pct: number | null;
  notes: string | null;
};

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);
  if (Number.isNaN(idNum)) notFound();

  const session = db
    .prepare(
      `SELECT id, date, type, location, duration_min, rpe, completion_pct, notes
       FROM sessions
       WHERE id = ?`,
    )
    .get(idNum) as Session | undefined;

  if (!session) notFound();

  return (
    <main className="mx-auto max-w-xl p-6">
      <Link href="/sessions" className="text-sm underline">
        ← Voltar
      </Link>

      <h1 className="text-2xl font-semibold mt-4 mb-6">
        Sessão de {session.date}
      </h1>

      <dl className="grid grid-cols-[8rem_1fr] gap-y-2 text-sm">
        <dt className="text-zinc-500">Tipo</dt>
        <dd>{session.type}</dd>

        <dt className="text-zinc-500">Local</dt>
        <dd>{session.location ?? '—'}</dd>

        <dt className="text-zinc-500">Duração (min)</dt>
        <dd>{session.duration_min ?? '—'}</dd>

        <dt className="text-zinc-500">RPE</dt>
        <dd>{session.rpe ?? '—'}</dd>

        <dt className="text-zinc-500">% completo</dt>
        <dd>{session.completion_pct ?? '—'}</dd>

        <dt className="text-zinc-500">Notas</dt>
        <dd className="whitespace-pre-wrap">{session.notes ?? '—'}</dd>
      </dl>
    </main>
  );
}

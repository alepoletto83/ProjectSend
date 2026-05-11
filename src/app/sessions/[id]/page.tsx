import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deleteSession } from '../actions';
import { getSession } from '@/lib/sessions';

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);
  if (Number.isNaN(idNum)) notFound();

  const session = getSession(idNum);
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

      <div className="flex gap-2 mt-6">
        <Link
          href={`/sessions/${session.id}/edit`}
          className="bg-black text-white rounded px-4 py-2"
        >
          Editar
        </Link>

        <form action={deleteSession}>
          <input type="hidden" name="id" value={session.id} />
          <button
            type="submit"
            className="bg-red-600 text-white rounded px-4 py-2">
            Excluir sessão
          </button>
        </form>
      </div>
    </main>
  );
}

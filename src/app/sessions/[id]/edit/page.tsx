import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateSession } from '../../actions';
import { getSession } from '@/lib/sessions';

export default async function EditSessionPage({
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
      <Link href={`/sessions/${session.id}`} className="text-sm underline">
        ← Cancelar
      </Link>

      <h1 className="text-2xl font-semibold mt-4 mb-6">Editar sessão</h1>

      <form action={updateSession} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={session.id} />

        <label className="flex flex-col gap-1">
          <span className="text-sm">Data</span>
          <input
            type="date"
            name="date"
            defaultValue={session.date}
            required
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Tipo</span>
          <select
            name="type"
            defaultValue={session.type}
            required
            className="border rounded px-3 py-2"
          >
            <option value="climb">climb</option>
            <option value="hangboard">hangboard</option>
            <option value="strength">strength</option>
            <option value="mobility">mobility</option>
            <option value="bjj">bjj</option>
            <option value="rest">rest</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Local</span>
          <select
            name="location"
            defaultValue={session.location ?? ''}
            className="border rounded px-3 py-2"
          >
            <option value="">—</option>
            <option value="home">home</option>
            <option value="groundup">groundup</option>
            <option value="outdoor">outdoor</option>
            <option value="other">other</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Duração (min)</span>
          <input
            type="number"
            name="duration_min"
            min={0}
            defaultValue={session.duration_min ?? ''}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">RPE (1–10)</span>
          <input
            type="number"
            name="rpe"
            min={1}
            max={10}
            defaultValue={session.rpe ?? ''}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">% completo (0–100)</span>
          <input
            type="number"
            name="completion_pct"
            min={0}
            max={100}
            defaultValue={session.completion_pct ?? ''}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Notas</span>
          <textarea
            name="notes"
            rows={4}
            defaultValue={session.notes ?? ''}
            className="border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2 mt-2"
        >
          Salvar alterações
        </button>
      </form>
    </main>
  );
}

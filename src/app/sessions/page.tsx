import Link from 'next/link';
import { listSessions } from '@/lib/sessions';

export default function SessionPage() {
  const rows = listSessions();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Sessões</h1>
        <Link
          href="/sessions/new"
          className="bg-black text-white rounded px-3 py-2 text-sm">
          Nova sessão
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-zinc-500">Nenhuma sessão ainda.</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th className="py-2 pr-4">Data</th>
              <th className="pr-4">Tipo</th>
              <th className="pr-4">Local</th>
              <th className="pr-4">Min</th>
              <th className="pr-4">RPE</th>
              <th className="pr-4">%</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b last:border-b-0">
                <td className="py-2 pr-4">
                  <Link href={`/sessions/${row.id}`} className="underline">
                    {row.date}
                  </Link>
                </td>
                <td className="pr-4">{row.type}</td>
                <td className="pr-4">{row.location ?? '—'}</td>
                <td className="pr-4">{row.duration_min ?? '—'}</td>
                <td className="pr-4">{row.rpe ?? '—'}</td>
                <td className="pr-4">{row.completion_pct ?? '—'}</td>
                <td className="max-w-xs truncate">{row.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

import Link from 'next/link';
import { listSessions } from '@/lib/sessions';

export default function Home() {
  const count = listSessions().length;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold mb-4">ProjectSend</h1>
      <p className="text-zinc-600 mb-6">
        Climbing training log — {count} sessão(ões) registrada(s).
      </p>

      <div className="flex gap-3">
        <Link
          href="/sessions"
          className="bg-black text-white rounded px-4 py-2 text-sm">
          Ver sessões
        </Link>
        <Link href="/sessions/new" className="border rounded px-4 py-2 text-sm">
          Nova sessão
        </Link>
      </div>
    </main>
  );
}

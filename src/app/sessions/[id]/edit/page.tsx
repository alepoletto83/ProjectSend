import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateSession } from '../../actions';
import { getSession } from '@/lib/sessions';
import { SessionForm } from '../../_components/session-form';

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

      <SessionForm
        action={updateSession}
        defaults={session}
        submitLabel="Salvar alterações"
      />
    </main>
  );
}

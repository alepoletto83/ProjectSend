import { SessionForm } from '../_components/session-form';
import { createSession } from '../actions';

export default function NewSessionPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Nova sessão</h1>

      <SessionForm action={createSession} />
    </main>
  );
}

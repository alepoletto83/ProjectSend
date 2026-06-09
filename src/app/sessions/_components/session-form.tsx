'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import type { FormState } from '../actions';
import type { Session } from '@/lib/sessions';

type Props = {
  action: (prev: FormState | null, formData: FormData) => Promise<FormState>;
  defaults?: Partial<Session>;
  submitLabel?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white rounded px-4 py-2 mt-2 disabled:opacity-50"
    >
      {pending ? 'Salvando...' : label}
    </button>
  );
}

export function SessionForm({
  action,
  defaults,
  submitLabel = 'Salvar',
}: Props) {
  const [state, formAction] = useActionState(action, null);
  const today = new Date().toISOString().slice(0, 10);
  const errors = state?.errors;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {errors?._form && (
        <p className="text-sm text-red-600">{errors._form}</p>
      )}

      {defaults?.id != null && (
        <input type="hidden" name="id" value={defaults.id} />
      )}

      <label className="flex flex-col gap-1">
        <span className="text-sm">Data</span>
        <input
          type="date"
          name="date"
          defaultValue={defaults?.date ?? today}
          className="border rounded px-3 py-2"
        />
        {errors?.date && (
          <span className="text-xs text-red-600">{errors.date}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm">Tipo</span>
        <select
          name="type"
          defaultValue={defaults?.type ?? 'climb'}
          className="border rounded px-3 py-2"
        >
          <option value="climb">climb</option>
          <option value="hangboard">hangboard</option>
          <option value="strength">strength</option>
          <option value="mobility">mobility</option>
          <option value="bjj">bjj</option>
          <option value="rest">rest</option>
        </select>
        {errors?.type && (
          <span className="text-xs text-red-600">{errors.type}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm">Local</span>
        <select
          name="location"
          defaultValue={defaults?.location ?? ''}
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
          defaultValue={defaults?.duration_min ?? ''}
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
          defaultValue={defaults?.rpe ?? ''}
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
          defaultValue={defaults?.completion_pct ?? ''}
          className="border rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm">Notas</span>
        <textarea
          name="notes"
          rows={4}
          defaultValue={defaults?.notes ?? ''}
          className="border rounded px-3 py-2"
        />
      </label>

      <SubmitButton label={submitLabel} />
    </form>
  );
}

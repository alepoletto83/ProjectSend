'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type FormState = {
  errors?: Record<string, string>;
};

function getString(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== 'string' || v === '') return null;
  return v;
}

function getNumber(formData: FormData, key: string): number | null {
  const v = getString(formData, key);
  return v === null ? null : Number(v);
}

export async function createSession(
  _prev: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const date = getString(formData, 'date');
  const type = getString(formData, 'type');

  const errors: Record<string, string> = {};
  if (!date) errors.date = 'Date is required';
  if (!type) errors.type = 'Type is required';
  if (Object.keys(errors).length > 0) return { errors };

  const location = getString(formData, 'location');
  const duration_min = getNumber(formData, 'duration_min');
  const rpe = getNumber(formData, 'rpe');
  const completion_pct = getNumber(formData, 'completion_pct');
  const notes = getString(formData, 'notes');

  db.prepare(
    `INSERT INTO sessions (date, type, location, duration_min, rpe, completion_pct, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(date, type, location, duration_min, rpe, completion_pct, notes);

  revalidatePath('/sessions');
  redirect('/sessions');
}

export async function updateSession(
  _prev: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const idNum = getNumber(formData, 'id');
  if (!idNum) {
    return { errors: { _form: 'Invalid or missing id' } };
  }

  const date = getString(formData, 'date');
  const type = getString(formData, 'type');

  const errors: Record<string, string> = {};
  if (!date) errors.date = 'Date is required';
  if (!type) errors.type = 'Type is required';
  if (Object.keys(errors).length > 0) return { errors };

  const location = getString(formData, 'location');
  const duration_min = getNumber(formData, 'duration_min');
  const rpe = getNumber(formData, 'rpe');
  const completion_pct = getNumber(formData, 'completion_pct');
  const notes = getString(formData, 'notes');

  db.prepare(
    `UPDATE sessions
        SET date = ?, type = ?, location = ?, duration_min = ?, rpe = ?, completion_pct = ?, notes = ?
      WHERE id = ?`,
  ).run(date, type, location, duration_min, rpe, completion_pct, notes, idNum);

  revalidatePath('/sessions');
  revalidatePath(`/sessions/${idNum}`);
  redirect(`/sessions/${idNum}`);
}

export async function deleteSession(formData: FormData) {
  const idNum = getNumber(formData, 'id');
  if (!idNum) {
    throw new Error('invalid or missing id');
  }
  db.prepare('DELETE FROM sessions WHERE id = ?').run(idNum);
  revalidatePath('/sessions');
  redirect('/sessions');
}

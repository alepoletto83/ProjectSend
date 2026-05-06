'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function getString(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== 'string' || v === '') return null;
  return v;
}

function getNumber(formData: FormData, key: string): number | null {
  const v = getString(formData, key);
  return v === null ? null : Number(v);
}

export async function createSession(formData: FormData) {
  const date = getString(formData, 'date');
  const type = getString(formData, 'type');
  if (!date || !type) {
    throw new Error('date and type are required');
  }

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

import { db } from './db';

export type Session = {
  id: number;
  date: string;
  type: string;
  location: string | null;
  duration_min: number | null;
  rpe: number | null;
  completion_pct: number | null;
  notes: string | null;
};

const COLUMNS =
  'id, date, type, location, duration_min, rpe, completion_pct, notes';

export function listSessions(filter?: { type?: string }): Session[] {
  const where = filter?.type ? 'WHERE type = ?' : '';
  const params = filter?.type ? [filter.type] : [];
  return db
    .prepare(
      `SELECT ${COLUMNS} FROM sessions ${where} ORDER BY date DESC, id DESC`,
    )
    .all(...params) as Session[];
}

export function getSession(id: number): Session | undefined {
  return db.prepare(`SELECT ${COLUMNS} FROM sessions WHERE id = ?`).get(id) as
    | Session
    | undefined;
}

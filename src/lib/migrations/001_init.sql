CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN (
    'climb', 'hangboard', 'strength', 'mobility', 'bjj', 'rest'
  )),
  location TEXT CHECK(location IN ('home', 'groundup', 'outdoor', 'other')),
  duration_min INTEGER,
  rpe INTEGER CHECK(rpe BETWEEN 1 AND 10),
  completion_pct INTEGER CHECK(completion_pct BETWEEN 0 AND 100),
  suggested_by_claude INTEGER DEFAULT 0,
  suggestion_id INTEGER,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (suggestion_id) REFERENCES suggestions(id)
);

CREATE INDEX idx_sessions_date ON sessions(date);

CREATE TABLE session_climbs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  name TEXT,
  grade TEXT NOT NULL,
  board TEXT CHECK(board IN (
    'mini_moon_2025', 'commercial', 'kilter', 'outdoor', 'other'
  )),
  attempts INTEGER DEFAULT 1,
  sent INTEGER DEFAULT 0,
  is_benchmark INTEGER DEFAULT 0,
  is_project INTEGER DEFAULT 0,
  notes TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE hangboard_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  protocol TEXT,
  edge_size_mm INTEGER,
  hold_type TEXT,
  weight_added_kg REAL DEFAULT 0,
  hang_seconds INTEGER NOT NULL,
  rest_seconds INTEGER,
  sets_completed INTEGER NOT NULL,
  sets_target INTEGER,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE strength_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  exercise TEXT NOT NULL,
  weight_lbs REAL,
  reps INTEGER,
  sets INTEGER,
  notes TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE body_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  weight_kg REAL,
  sleep_hours REAL,
  shoulder_pain_right INTEGER CHECK(shoulder_pain_right BETWEEN 0 AND 10),
  shoulder_pain_left INTEGER CHECK(shoulder_pain_left BETWEEN 0 AND 10),
  elbow_pain_right INTEGER CHECK(elbow_pain_right BETWEEN 0 AND 10),
  elbow_pain_left INTEGER CHECK(elbow_pain_left BETWEEN 0 AND 10),
  finger_pain INTEGER CHECK(finger_pain BETWEEN 0 AND 10),
  energy INTEGER CHECK(energy BETWEEN 1 AND 10),
  notes TEXT
);

CREATE TABLE suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  content TEXT NOT NULL,
  rationale TEXT,
  accepted INTEGER DEFAULT 0,
  session_id INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE TABLE points_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  source TEXT NOT NULL CHECK(source IN (
    'session', 'streak', 'milestone', 'benchmark_send', 'project_send', 'consistency'
  )),
  points INTEGER NOT NULL,
  reason TEXT,
  related_session_id INTEGER,
  FOREIGN KEY (related_session_id) REFERENCES sessions(id)
);

CREATE TABLE milestones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  points_awarded INTEGER DEFAULT 0
);

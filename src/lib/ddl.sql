CREATE TYPE status_enum AS ENUM
(
  'idle',
  'playing',
  'stopped'
);

CREATE TABLE activities
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  started_at TIMESTAMPTZ,
  stopped_at TIMESTAMPTZ,
  status status_enum DEFAULT 'idle' NOT NULL,
  memo_id INTEGER,

  PRIMARY KEY (id)
);

CREATE TABLE memos 
(
  id SERIAL,
  memo TEXT,

  PRIMARY KEY (id)
)

CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,

  PRIMARY KEY (identifier, token)
);

CREATE TABLE accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,

  PRIMARY KEY (id)
);

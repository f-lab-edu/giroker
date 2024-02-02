const statusEnum = `CREATE TYPE status_enum AS ENUM ('idle', 'playing', 'stopped')`;

const activitiesTable = `CREATE TABLE activities ( 
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  description TEXT,
                  started_at TIMESTAMP,
                  stopped_at TIMESTAMP,
                  status status_enum DEFAULT 'idle' NOT NULL
                );`;

export { statusEnum, activitiesTable };

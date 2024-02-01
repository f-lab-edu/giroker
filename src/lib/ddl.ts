const statusEnum = `CREATE TYPE status_enum AS ENUM ('idle', 'playing', 'stopped')`;

const activitiesTable = `CREATE TABLE Activities ( 
                  id VARCHAR(255) PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  description TEXT,
                  started_at TIMESTAMP NOT NULL,
                  stopped_at TIMESTAMP NOT NULL,
                  status status_enum
                );`;

export { statusEnum, activitiesTable };

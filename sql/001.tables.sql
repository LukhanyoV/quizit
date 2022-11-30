-- table for users
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL
);

-- table for game levels
CREATE TABLE modes (
    id SERIAL PRIMARY KEY,
    mode VARCHAR(10) NOT NULL,
    start_num INTEGER NOT NULL,
    end_num INTEGER NOT NULL
);

-- table for leaderboard
CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    mode_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (mode_id) REFERENCES modes(id)
);
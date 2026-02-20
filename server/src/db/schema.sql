CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    spotify_id VARCHAR(50) UNIQUE,
    title VARCHAR(50) NOT NULL,
    artist VARCHAR(50),
    album VARCHAR(50),
    spotify_image VARCHAR(500),
    duration INT,
    first_user INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE song_tags (
    id SERIAL PRIMARY KEY,
    song_id INT REFERENCES songs(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (song_id, tag_id)
);

CREATE TABLE tag_votes (
    id SERIAL PRIMARY KEY,
    song_tag_id INT REFERENCES song_tags(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    vote SMALLINT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (song_tag_id, user_id)
);

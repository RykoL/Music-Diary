ALTER TABLE entries RENAME TO old_entries;

CREATE TABLE IF NOT EXISTS entries
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(50) NOT NULL,
    content VARCHAR NOT NULL,
    date date DEFAULT CURRENT_DATE,
    songId varchar,
    CONSTRAINT fk_songId
    FOREIGN KEY (songId)
    REFERENCES song(id)
);

INSERT INTO entries(title, content, date, songId) SELECT old_entries.title, old_entries.content, old_entries.date, song.id FROM old_entries, song;
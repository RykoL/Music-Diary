ALTER TABLE entries
    rename to entries_old;

ALTER TABLE image rename to image_old;

CREATE TABLE IF NOT EXISTS entry
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    title   VARCHAR(50) NOT NULL,
    content VARCHAR     NOT NULL,
    date    date DEFAULT CURRENT_DATE,
    songId  varchar,
    diaryId varchar,
    CONSTRAINT fk_songId
        FOREIGN KEY (songId)
            REFERENCES song (id),
    CONSTRAINT fk_diaryId
        FOREIGN KEY (diaryId)
            REFERENCES diary (id)
);

create table image
(
    id       varchar PRIMARY KEY,
    entry_id INTEGER NOT NULL,
    CONSTRAINT fk_entry_id
        FOREIGN KEY (entry_id)
            REFERENCES entry (id)
);

INSERT INTO diary VALUES ('c2383d72-53f4-4a8b-b09f-fa416d4fcb8e', 'My music diary', 'This is your first diary');
INSERT INTO entry(id, title, content, date, songId, diaryId) SELECT id, title, content, date, songId, 'c2383d72-53f4-4a8b-b09f-fa416d4fcb8e' as diaryId FROM entries_old;
INSERT INTO image SELECT * from image_old;

DROP TABLE image_old;
DROP TABLE entries_old;
create table image
(
    id       varchar PRIMARY KEY,
    entry_id INTEGER NOT NULL,
    CONSTRAINT fk_entry_id
        FOREIGN KEY (entry_id)
            REFERENCES entries (id)
)
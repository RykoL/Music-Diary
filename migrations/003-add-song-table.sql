create table if not exists song (
    id varchar PRIMARY KEY UNIQUE,
    url varchar NOT NULL,
    embed varchar NOT NULL
);
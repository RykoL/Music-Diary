ALTER TABLE entries ADD COLUMN date date;
UPDATE entries SET date = CURRENT_DATE;

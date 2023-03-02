-- Reference tables
CREATE TABLE type(
  name    TEXT    PRIMARY KEY
);

INSERT INTO type VALUES('text');

CREATE TABLE card(
  -- Autoincrements by default; this is an alias for ROWID.
  -- Do not do this if you want to use a foreign key constraint.
  id      INTEGER PRIMARY KEY, 
  title   TEXT    NOT NULL,
  body    TEXT    DEFAULT '',
  type    TEXT    DEFAULT 'text' REFERENCES type(name),
  date    TEXT    DEFAULT CURRENT_TIMESTAMP
);
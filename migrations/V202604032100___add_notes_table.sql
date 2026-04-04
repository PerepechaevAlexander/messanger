DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Notes') THEN

CREATE TABLE Notes
(
	"Id"		            SERIAL		PRIMARY KEY,
    "IsDeleted"             BOOLEAN     NOT NULL        DEFAULT FALSE,
    "CreationDateTime"      TIMESTAMP   NOT NULL,
    "LastModifyDateTime"    TIMESTAMP   NOT NULL,
    "LastModifyUserId"      INTEGER     NOT NULL        DEFAULT 1,
    "Title"                 TEXT        NOT NULL,
    "Content"              TEXT
);

COMMENT ON TABLE Notes IS 'Заметки';
COMMENT ON COLUMN Notes."Id" IS 'Идентификатор';
COMMENT ON COLUMN Notes."IsDeleted" IS 'Сущность удалена?';
COMMENT ON COLUMN Notes."CreationDateTime" IS 'Дата/время создания';
COMMENT ON COLUMN Notes."LastModifyDateTime" IS 'Дата/время последнего изменения';
COMMENT ON COLUMN Notes."LastModifyUserId" IS 'Идентификатор пользователя, последним измененившего сущность';
COMMENT ON COLUMN Notes."Title" IS 'Наименование заметки';
COMMENT ON COLUMN Notes."Content" IS 'Содержание заметки';

END IF;
END $$;
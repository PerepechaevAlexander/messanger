import { BaseDto } from "./base/base-dto";

/** Заметка. */
export class Note extends BaseDto {

  /** Наименование заметки. */
  title: string;

  /** Содержание заметки. */
  content: string;

  constructor(
    id: number,
    isDeleted: boolean,
    creationDateTime: Date,
    lastModifyDateTime: Date,
    lastModifyUserId: number,
    title: string,
    content: string
  ) {
    super(id, isDeleted, creationDateTime, lastModifyDateTime, lastModifyUserId);
    this.title = title;
    this.content = content;
  }
}

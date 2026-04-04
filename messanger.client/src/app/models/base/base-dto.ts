/** Базовый класс всех DTO. */
export class BaseDto {

  /** Идентификатор. */
  id: number;

  /** Сущность удалена? */
  isDeleted: boolean;

  /** Дата/время создания. */
  creationDateTime: Date;

  /** Дата/время последнего изменения. */
  lastModifyDateTime: Date;

  /** Идентификатор пользователя, последним измененившего сущность. */
  lastModifyUserId: number;

  constructor(
    id: number,
    isDeleted: boolean,
    creationDateTime: Date,
    lastModifyDateTime: Date,
    lastModifyUserId: number
  ) {
    this.id = id;
    this.isDeleted = isDeleted;
    this.creationDateTime = creationDateTime;
    this.lastModifyDateTime = lastModifyDateTime;
    this.lastModifyUserId = lastModifyUserId;
  }
}

import DatabaseSqlite from '../database/index.js';
import type { SelectWhereType } from '../interface/databaseSqlite.js';
import type { UrlModelType } from '../interface/url.js';

export default class UrlModel {
  declare test: string;
  private db: DatabaseSqlite;
  constructor() {
    this.db = new DatabaseSqlite();
    this.db.createTable();
  }
  findAll() {
    return this.db.select('urls');
  }
  findBy({ where }: SelectWhereType): UrlModelType[] {
    return this.db.select('urls', { where }) as UrlModelType[];
  }

  create(...urlObject: SelectWhereType['where'][]) {
    this.db.insertInto('urls', urlObject);
  }
  update(urlObject: SelectWhereType['where'], where: Partial<UrlModelType>) {
    this.db.update('urls', urlObject, where);
  }
}

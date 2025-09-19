import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'path';
import sqlBricks, { type WhereObject } from 'sql-bricks';
import type { SelectWhereType } from '../interface/databaseSqlite.js';
// import type { UrlModelType } from '../interface/Url.js';

export default class DatabaseSqlite {
  private pathDb: string = resolve(process.cwd(), 'src', 'database', 'smallUrl.db');
  private db: DatabaseSync = new DatabaseSync(this.pathDb);
  constructor() {
    this.createTable();
  }
  dropTable(tableName = 'urls') {
    this.db.exec(`DROP TABLE ${tableName}`);
  }
  createTable(tableName = 'urls') {
    this.db.exec(`CREATE TABLE IF NOT EXISTS ${tableName}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url_origin TEXT NOT NULL UNIQUE,
      url_hash TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0
      ) strict`);
  }

  insertInto<I>(tableName: string, items: I) {
    const { text, values } = sqlBricks.insertInto(tableName, items).toParams({ placeholder: '?' });

    const insertStatement = this.db.prepare(text);
    insertStatement.run(...values);
  }

  private query(table: string, { where }: SelectWhereType) {
    let query = sqlBricks.select().from(table);
    if (where) query = query.where(where);

    return query.toString();
  }

  select(table: string, { where = null }: SelectWhereType = { where: null }) {
    return this.db.prepare(this.query(table, { where })).all();
  }
  update<U, W extends WhereObject>(table: string, value: U, where: W) {
    const { text, values } = sqlBricks.update(table, value).where(where).toParams({ placeholder: '?' });
    const updatePrepared = this.db.prepare(text);
    updatePrepared.run(...values);
  }
}

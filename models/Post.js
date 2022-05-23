const { response } = require("express");
const db = require("../config/db");

class Post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  async save() {
    try {
      const d = new Date();

      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();
      const createdAt = `${year}-${month}-${date}`;

      const sql = `INSERT INTO posts(
            title,
            body,
            created_at
        ) VALUES(
            '${this.title}',
            '${this.body}',
            '${createdAt}'
        );`;

      return db.execute(sql);
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      const sql = "SELECT * FROM posts";
      const response = await db.execute(sql);
      const [data, _] = response;
      return data;
    } catch (err) {
      throw err;
    }
  }
  static async getById(id) {
    try {
      const sql = `SELECT * FROM posts where id = '${id}'`;
      const response = await db.execute(sql);
      const [data, _] = response;
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Post;

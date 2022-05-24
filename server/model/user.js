const db = require("../config/db");

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  async create() {
    try {
      const date = new Date();
      const yyyy = date.getFullYear();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      const createdAt = `${yyyy}-${mm}-${dd}`;

      const sql = `INSERT INTO users_tables(
        name,age,created_at
      ) VALUES (
        '${this.name}',
        '${this.age}',
        '${createdAt}'
      );`;
      await db.execute(sql);
    } catch (err) {
      throw err;
    }
  }
  static async getAll() {
    try {
      const sql = "SELECT * FROM users_tables";
      const res = await db.execute(sql);
      const [data, _] = res;
      return data;
    } catch (err) {
      throw err;
    }
  }
  static async deleteUser(id) {
    const sql = `DELETE FROM users_tables where id = '${id}' ;`;
    try {
      const res = await db.execute(sql);
    } catch (err) {
      throw err;
    }
  }
  static async getUserById(id) {
    try {
      const sql = `SELECT * FROM users_tables WHERE id = '${id}'`;
      const res = await db.execute(sql);
      const [data, _] = res;
      return data;
    } catch (err) {
      throw err;
    }
  }
  async updateUser(id) {
    try {
      const sql = `UPDATE users_tables SET name = '${this.name}' , age = '${this.age}' WHERE id = ${id};`;
      await db.execute(sql);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = User;

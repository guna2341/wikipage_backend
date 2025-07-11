const db = require('../db');

const userModel = {
  find: async () => {
    const [result] = await db.query("SELECT * FROM USERS");
    return result;
  },
  insert: async (username, email, password, role) => {
      await db.query(
        "INSERT INTO USERS (name,email,password,role) VALUES (?,?,?,?)",
        [username, email, password, role]
      );
      return { username, email, role };
    },

  findByQuery: async ({ name, email, role }) => {
    let sql =
      "SELECT id,name,password,role,created_at,email FROM USERS WHERE 1=1";
    const params = [];

    if (name) {
      sql += " AND name LIKE ?";
      params.push(`%${name}%`);
    }

    if (email) {
      sql += " AND email LIKE ?";
      params.push(`%${email}%`);
    }

    if (role) {
      sql += " AND role = ?";
      params.push(role);
    }

    const [result] = await db.query(sql, params);
    return result;
  },
  findByLimit: async (
    offset = 0,
    limit = 10,
  ) => {
    const sql = `SELECT id,name,role,created_at,email FROM STUDENTS LIMIT ${Number(
      limit
    )} OFFSET ${Number(offset)}`;

    const [result] = await db.query(sql);
    return result;
  },

  delete: async (id) => { 
    const sql = `DELETE FROM USERS WHERE id in ${id}`;
    const result = await db.query(sql);
    return result;
  },

  edit: async (id, username, email, role) => { 
    const sql = `UPDATE USERS SET name = '${username}', email = '${email}', role = '${role}' WHERE id = ${id}`;
    const result = await db.query(sql);
    return result;
  }
};

module.exports = { userModel };
const db = require("../db");

const studentModel = {
  getStudent: async () => {
    const [result] = await db.query("SELECT * FROM students");
    return result;
  },

  getStudentByQuery: async (
    search,
    dept,
    sem,
    year,
    page = 1,
    limit = 10,
    sortOrder = "ASC"
  ) => {
    const conditions = [];
    const params = [];

    
    if (search) {
      conditions.push("WHERE (name LIKE ? OR id LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }
    
    
    // Final SQL queries
    const sql = `SELECT * FROM students ${conditions.join()} ORDER BY id ${
      sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC"
    }`;
    const countQuery = "SELECT COUNT(*) as count FROM STUDENTS";

    const paginatedSql = !search ? `${sql} LIMIT ? OFFSET ?` : sql;
    
    const paginatedParams = [...params];

    if (!search) {
      const offset = (page - 1) * limit;
      paginatedParams.push(Number(limit), Number(offset));
    }

    const [[{ count }]] = await db.query(countQuery); 
    const [result] = await db.query(paginatedSql, paginatedParams);

    return { result, count };
  },

  deleteStudent: async (id) => {
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);
    return result;
  },

  editStudent: async (id, updatedData) => {
    const { name, email, role, sem, dept, year } = updatedData;
    const [result] = await db.query(
      "UPDATE students SET name = ?, email = ?, role = ?, section = ?, dept = ?, year = ? WHERE id = ?",
      [name, email, role, sem, dept, year, id]
    );
    return result;
  },
};

module.exports = { studentModel };

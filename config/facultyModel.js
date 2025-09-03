const db = require("../db");

const facultyModel = {
  getfaculty: async () => {
    const [result] = await db.query("SELECT * FROM faculty");
    return result;
  },

  getFacultyByQuery: async (search, dept, sem, year, page = 1, limit = 10, sortOrder = "ASC") => {
    let conditions = [];
    let params = [];
    if (search) {
      conditions.push("Where (name LIKE ?)");
      params.push(`%${search}%`);
    }
    let sql = `SELECT * FROM faculty ${conditions.join()} ORDER BY name`;
    const paginatedSql = search ? sql : `${sql} LIMIT ? OFFSET ?`;
    const paginatedParams = [...params];
    const countQuery = "SELECT COUNT(*) as count FROM faculty";
    if (!search) {
      const offset = (page - 1) * limit;
      paginatedParams.push(Number(limit), Number(offset));
    }
    const [[{ count }]] = await db.query(countQuery); 
    const [result] = await db.query(paginatedSql, paginatedParams);
    return { result, count };
  },
  

  deletefaculty: async (id) => {
    const [result] = await db.query("DELETE FROM faculty WHERE id = ?", [id]);
    return result;
  },

  editfaculty: async (id, updatedData) => {
    const { name, email, role, sem, dept, year } = updatedData;
    const [result] = await db.query(
      "UPDATE faculty SET name = ?, email = ?, role = ?, sem = ?, dept = ?, year = ? WHERE id = ?",
      [name, email, role, sem, dept, year, id]
    );
    return result;
    },
  
    findByLimit: async (
      offset = 0,
      limit = 10,
      role,
    ) => {
      const sql = `SELECT * FROM faculty WHERE role = '${role}' LIMIT ${Number(
        limit
      )} OFFSET ${Number(offset)}`;
  
      const [result] = await db.query(sql);
      return result;
    },
  
};

module.exports = { facultyModel };

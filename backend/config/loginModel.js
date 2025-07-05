const db = require('../db');

const loginModel = {
    find: async () => {
        console.log(values);
        const [result] = await db.query(
            "SELECT * FROM USERS"
        );
        return result;
    },
    insert: async (username,email,password,role) => {
        db.query(
            "INSERT INTO USERS (name,email,password,role) VALUES (?,?,?,?)",
            [username, email, password, role]
        )
        return { username, email, password, role };
    },

    findByQuery: async ({ name, email, role }) => {
        let sql = "SELECT * FROM USERS WHERE 1=1";
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
      }
};

module.exports = { loginModel };
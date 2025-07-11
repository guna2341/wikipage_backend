const { facultyModel } = require("../../config/facultyModel");
const { studentModel } = require("../../config/studentModel");


const editUsers = async (req,res) => {
    const { id, username, email, role, dept, sem, year } = req.body;
    if (!id || !username || !email || !role || !dept || !sem || !year) { 
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        if (role == 'student') {
            const newUser = { name: username, email, role, sem, dept, year };
            const user = await studentModel.editStudent(
                id,
                newUser
            );
            return res.status(200).json({ message: 'User updated successfully', user });
        }
        else {
            const newUser = { name: username, email, role, sem, dept, year };
            const user = await facultyModel.editfaculty(id, newUser);
            return res
              .status(200)
              .json({ message: "User updated successfully", user });
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Something went wrong', err:err.message });
    }
 };

module.exports = { editUsers };
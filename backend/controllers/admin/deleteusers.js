const { facultyModel } = require("../../config/facultyModel");
const { studentModel } = require("../../config/studentModel");


const deleteUser = async (req,res) => { 
    try {
        const { id } = req.body;
        const { role } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Please provide an id' });
        }
        if (role == 'student') {
            await studentModel.deleteStudent(id);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        else {
            await facultyModel.deletefaculty(id);
            res.status(200).json({ message: "User deleted successfully" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
    
module.exports = { deleteUser };
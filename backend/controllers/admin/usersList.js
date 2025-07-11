const { facultyModel } = require("../../config/facultyModel");
const { studentModel } = require("../../config/studentModel");

const usersList = async (req, res) => { 
    const { limit, role, dept, sem, year, page, sortOrder, search  } = req.query;
    if (!role) { 
        return res.status(400).json({ message: "Role is not provided" });
    };
    try {
        if (role == 'student') {
            const students = await studentModel.getStudentByQuery(
              search,
              dept,
              sem,
              year,
              (page) ,
              (limit),
              sortOrder
          );

            return res.status(200).json({ message: "Students fetched successfully", data: students.result,length:students.count });
        }
        else {
            const faculty = await facultyModel.getFacultyByQuery(
              search,
              dept,
              sem,
              year,
              (page),
              (limit),
              sortOrder
          );
            return res
              .status(200)
              .json({
                message: "Faculties fetched successfully",
                data: faculty.result,
                length:faculty.count
              });
        }
        }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", err: err.message });
    }
};

module.exports = { usersList };
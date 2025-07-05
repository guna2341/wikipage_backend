const regulation = (req, res) => {
    const { department, year, semester } = req.query;
    console.log(department, year, semester);
    return res.json({text:"admin"});
}

module.exports = { regulation };
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3001;
const api = "wikipage";


// imports
const auth = require('./routes/authRoutes/authRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
const facultyRoutes = require('./routes/faculty/facultyRoutes');
const studentRoutes = require('./routes/student/studentRoutes');

// body-parser
app.use(express.json());

// cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes
app.use(`/${api}/auth`, auth);
app.use(`/${api}/admin`, adminRoutes);
app.use(`/${api}/faculty`, facultyRoutes);
app.use(`/${api}/student`, studentRoutes);
app.use(`/${api}`, (req, res) => { res.json('Hello') });
app.use('/', (req, res) => {res.sendFile(path.join(__dirname, "public", "index.html"))});


// server start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
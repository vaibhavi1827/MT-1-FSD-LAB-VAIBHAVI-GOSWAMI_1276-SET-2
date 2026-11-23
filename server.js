
const express = require('express');
const app = express();

app.use(express.json());


let students = [
    {
        id: 201,
        rollNumber: "CSE2401",
        name: "Aarav Sharma",
        branch: "CSE",
        semester: 3,
        email: "aarav@example.com"
    },
    {
        id: 202,
        rollNumber: "ECE2402",
        name: "Diya Verma",
        branch: "ECE",
        semester: 3,
        email: "diya@example.com"
    },
    {
        id: 203,
        rollNumber: "CSE2403",
        name: "Kabir Singh",
        branch: "CSE",
        semester: 3,
        email: "kabir@example.com"
    }
];


app.get('/api/students', (req, res) => {
    res.json(students);
});

app.post('/api/students', (req, res) => {
    let student = req.body;

    if (!student.rollNumber || !student.name ||
        !student.branch || !student.semester ||
        !student.email) {
        return res.status(400).send("All fields are required");
    }

    student.id = students[students.length - 1].id + 1;

    students.push(student);

    res.status(201).json(student);
});


app.get('/api/students/:id', (req, res) => {
    let id = Number(req.params.id);

    let student = students.find(s => s.id === id);

    if (student) {
        res.json(student);
    } else {
        res.status(404).send("Student not found");
    }
});

app.put('/api/students/:id', (req, res) => {
    let id = Number(req.params.id);

    let student = students.find(s => s.id === id);

    if (student) {
        student.rollNumber = req.body.rollNumber;
        student.name = req.body.name;
        student.branch = req.body.branch;
        student.semester = req.body.semester;
        student.email = req.body.email;

        res.json(student);
    } else {
        res.status(404).send("Student not found");
    }
});


app.delete('/api/students/:id', (req, res) => {
    let id = Number(req.params.id);

    let index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        students.splice(index, 1);
        res.send("Student deleted successfully");
    } else {
        res.status(404).send("Student not found");
    }
});


app.get('/api/students/filter', (req, res) => {
    let branch = req.query.branch;

    let result = students.filter(
        s => s.branch.toLowerCase() === branch.toLowerCase()
    );

    res.json(result);
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});

// Import Express.js framework
const express = require('express');
// Create an Express app instance
const app = express();
// Set the port number for our server
const PORT = 8000;

// Middleware setup.
// Middleware = functions that process requests before they reach route handlers
// We will use express.json(), which parses incoming JSON requests and puts the data in req.body
// Without this, we wouldn't be able to read JSON data sent by clients
app.use(express.json());

// In a real app, you'd use a database like MongoDB or PostgreSQL
// For the purpose of the demo, we will use a fake database below.
// Note that the data must be in a JSON format
const dorms = {
    'simmons': ['Hailey Pan', 'Eric Zhan', 'Owen Coulter', 'Rachel Onwu'],
    'random': ['Jensen Coonradt', 'Fiona Lu', 'Grant Hu'],
    'maseeh': ['Alexander Liang', 'Anna Li', 'Justin Le', 'Natalie Tan', 'Vy Pham'],
    'baker': ['Victoria Park', 'Stephen Hong', 'Kara Chou'],
    'mccormick': ['Bhadra Rupesh', 'Jack MarionSims', 'Josephine Wang']
};

// GET endpoint to retrieve the number of students in a dorm
// The client needs to send a JSON body with the dorm name
app.get('/dorm/num_students', (req, res) => {
    // Extract the dorm name from the request body
    const dormName = req.body.dorm;

    // Check if dorm name was provided
    // If not, return a 400 Bad Request error
    if (!dormName) {
        return res.status(400).json({ error: 'Dorm name is required' });
    }

    // Check if the dorm exists in our "database"
    // If not, return a 404 Not Found error
    if (!dorms[dormName]) {
        return res.status(404).json({ error: 'Dorm not found' });
    }

    // Calculate the number of students by getting the array length
    const numStudents = dorms[dormName].length;

    // Return a JSON response with the dorm name and student count
    return res.json({ dorm: dormName, students: numStudents });
});

// POST endpoint to add a student to a specified dorm
// The client must send a JSON body with dorm name and student name
app.post('/dorm/num_students', (req, res) => {
    // Extract both dorm and student name from the request body using destructuring
    const { dorm, student } = req.body;

    // Check that both required fields are present
    if (!dorm || !student) {
        return res.status(400).json({ error: 'Dorm name and student name are required' });
    }

    // If the dorm doesn't exist yet, create it as an empty array
    // This allows adding students to new dorms without extra steps
    if (!dorms[dorm]) {
        dorms[dorm] = [];
    }

    // Add the new student to the dorm's student array
    dorms[dorm].push(student);

    // Return a 201 Created status with a success message and updated count
    // 201 is a status code that means successful resource creation
    return res.status(201).json({
        message: 'Student added successfully',
        dorm: dorm,
        students: dorms[dorm].length
    });
});

// Start the Express server and listen for incoming requests
// The callback function runs once the server is successfully started
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Try these endpoints:
  - GET /dorm/num_students (send {"dorm": "simmons"} in request body)
  - POST /dorm/num_students (send {"dorm": "simmons", "student": "new_student"} in request body)`);
});

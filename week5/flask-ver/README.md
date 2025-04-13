## Setup Instructions

### Prerequisites

- **Python 3.x**  
  Download and install Python from [python.org](https://python.org).

### Running the Program

**Install Flask**  
Enter "pip install Flask" into your command line to install Flask

**Running the API**
Start the Flask server by navigating to the week5/flask-ver director and running:

python flaskVer.py

By default, the server will run on port 8000. When the server starts, you will see output similar to:

Server running on port 8000

NOTE: I always mess this up when testing endpoints. You need to open a new terminal tab to test these since your other terminal tab is already running your server.

**Testing the Endpoints**
You can test the endpoints using curl (just type the below commands into your terminal) or any API testing tool like Postman.

GET Endpoint (Retrieve the Number of Students in a Dorm)

curl -X GET http://localhost:8000/dorm/num_students \
 -H "Content-Type: application/json" \
 -d '{"dorm": "simmons"}'

Expected Response:

{
"dorm": "simmons",
"students": 4
}

POST Endpoint (Add a Student to a Dorm)

curl -X POST http://localhost:8000/dorm/num_students \
 -H "Content-Type: application/json" \
 -d '{"dorm": "simmons", "student": "Rebecca Xiong"}'
Expected Response:

{
"message": "Student added successfully",
"dorm": "simmons",
"students": 5
}

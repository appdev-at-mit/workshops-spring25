## Setup Instructions

### Prerequisites
- Node.js (download from [nodejs.org](https://nodejs.org/))
- Any version is fine

### Installation
1. Make sure you are in the express-ver directory. From the root:
```bash
cd week5
cd express-ver
```

2. Create a `package.json` file by running:
```bash
npm init -y
```

3. Install Express:
```bash
npm install express
```

## Running the API
Run the server with:
```bash
node app.js
```

The server will start on port 3000.

## Testing the Endpoints

### Using curl (in a new terminal window)

#### GET endpoint (get number of students in a dorm):
```bash
curl -X GET http://localhost:3000/dorm/num_students \
  -H "Content-Type: application/json" \
  -d '{"dorm": "simmons"}'
```

Expected response:
```json
{
  "dorm": "simmons",
  "students": 4
}
```

#### POST endpoint (add a student to a dorm):
```bash
curl -X POST http://localhost:3000/dorm/num_students \
  -H "Content-Type: application/json" \
  -d '{"dorm": "simmons", "student": "Rebecca Xiong"}'
```

Expected response:
```json
{
  "message": "Student added successfully",
  "dorm": "simmons",
  "students": 5
}
```
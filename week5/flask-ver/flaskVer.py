from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# for cors to work
# https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# we are listening at this port
PORT = 8000

# Fake "database" containing dorm names and a list of student names.
dorms = {
    'simmons': ['Hailey Pan', 'Eric Zhan', 'Owen Coulter', 'Rachel Onwu'],
    'random': ['Jensen Coonradt', 'Fiona Lu', 'Grant Hu'],
    'maseeh': ['Alexander Liang', 'Anna Li', 'Justin Le', 'Natalie Tan', 'Vy Pham'],
    'baker': ['Victoria Park', 'Stephen Hong', 'Kara Chou'],
    'mccormick': ['Bhadra Rupesh', 'Jack MarionSims', 'Josephine Wang']
}

# GET endpoint to retrieve the number of students in a dorm.
@app.route('/dorm/num_students', methods=['GET'])
@cross_origin()
def get_num_students():
    # Try to parse JSON data from the request body.
    dorm_name = request.args.get('dormName', None)

    # If no dorm name is provided, return a 400 Bad Request error.
    if not dorm_name:
        return jsonify({'error': 'Dorm name is required'}), 400

    # If the dorm does not exist in our "database", return a 404 error.
    if dorm_name not in dorms:
        return jsonify({'error': 'Dorm not found'}), 404

    # Calculate and return the number of students.
    num_students = len(dorms[dorm_name])
    return jsonify({'dorm': dorm_name, 'count': num_students})


# POST endpoint to add a student to a specified dorm.
@app.route('/dorm/num_students', methods=['POST'])
@cross_origin()
def add_student():
    # Parse the JSON data from the request body.
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': 'Request body must be JSON'}), 400

    # Extract dorm and student information.
    dorm = data.get('dormName')
    student = data.get('name')
    print(dorm, student)

    # Validate that both fields are present.
    if not dorm or not student:
        return jsonify({'error': 'Dorm name and student name are required'}), 400

    # If the dorm does not exist, create a new list for it.
    if dorm not in dorms:
        dorms[dorm] = []

    # Add the student to the dorm's list.
    dorms[dorm].append(student)

    # Return a success message along with the updated student count.
    return jsonify({
        'message': 'Student added successfully',
        'dorm': dorm,
        'students': len(dorms[dorm])
    }), 201


if __name__ == '__main__':
    # Print instructions similar to the Express.js server.
    print(f"Server running on port {PORT}")
    print("Try these endpoints:")
    print("  - GET /dorm/num_students (send {\"dorm\": \"simmons\"} in request body)")
    print("  - POST /dorm/num_students (send {\"dorm\": \"simmons\", \"student\": \"new_student\"} in request body)")
    
    # Start the Flask server.
    app.run(port=PORT)

import sqlite3

# connect to the database
con = sqlite3.connect('db.sqlite3')
cur = con.cursor()

dorms = {
    'simmons': ['Hailey Pan', 'Eric Zhan', 'Owen Coulter', 'Rachel Onwu'],
    'random': ['Jensen Coonradt', 'Fiona Lu', 'Grant Hu'],
    'maseeh': ['Alexander Liang', 'Anna Li', 'Justin Le', 'Natalie Tan', 'Vy Pham'],
    'baker': ['Victoria Park', 'Stephen Hong', 'Kara Chou'],
    'mccormick': ['Bhadra Rupesh', 'Jack MarionSims', 'Josephine Wang']
};
 
# populate the db with some fake data
for dorm_name, students in dorms.items():
    for student in students:
        cur.execute(
                f'INSERT INTO students_student (name, dorm) VALUES ("{student}", "{dorm_name}");')
con.commit()



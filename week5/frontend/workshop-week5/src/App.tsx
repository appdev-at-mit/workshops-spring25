import { useState } from 'react';
import axios from 'axios';
import assert from 'assert';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Express URL
// const apiUrl = 'http://localhost:8000/dorm/num_students?';

// Django + Flask URL
const apiUrl = 'http://127.0.0.1:8000/dorm/num_students?';

function App() {
  const [count, setCount] = useState<number>(0);
  const [activeDorm, setActiveDorm] = useState<string|undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);
  const [studentName, setStudentName] = useState<string>('');
  const [dormName, setDormName] = useState<string>('');

  interface FormData {
    dormName: {value: string},
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = event.target as typeof event.target & FormData;
    console.log(event);
    console.log(formData);
    console.log(formData.dormName.value);
    const dormName = formData.dormName.value;
    axios.get<{count: number}>(apiUrl, {
      method: 'GET', 
      headers: {'content-type': 'application/json;charset=UTF-8'},
      params: {dormName: dormName},}
     ).then(
       (res) => res.data
     ).catch(
       (error: any) => {
         if (axios.isAxiosError(error)) {
           setErrorMessage(`ERROR: ${error.response?.data.message??error.response?.data.error}`);
           setActiveDorm(undefined);
           console.log('error ', error);
           console.log('error ', error.response?.data.message);
         } else {
           setErrorMessage("Something went wrong.");
         }
       }
     ).then(
       (data: void|{count: number}) => {
         if (!data) {
           return;
         }
         console.log(data);
         console.log(data.count);
         setCount(data.count);
         setActiveDorm(dormName);
         setErrorMessage(undefined);
     });
    return;
  }

  // WEEK 6: POST name and dorm
  async function handleAddStudent(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post(apiUrl, {
        method: 'POST',
        name: studentName,
        dormName: dormName
      }, {
        headers: {'content-type': 'application/json;charset=UTF-8'}
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`ERROR: ${error.response?.data.message??error.response?.data.error}`);
      } else {
        setErrorMessage("Something went wrong.");
      }
    }
  }


  return (
    <>
      <h1>Dorm Counter</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Enter dorm: </label>
          <input type="text" name="dormName"></input>
          <button type="submit">Search</button>
          <br/>
        </form>
        {activeDorm !== undefined ?
        <p>
          number of students living in <b>{activeDorm}</b>: {count}
        </p> : <></>
        }
        <p>
        {errorMessage??<></>}
        </p>

        <h2>Add New Student</h2>
        <form onSubmit={handleAddStudent}>
          <div>
            <label>Student Name: </label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          <div>
            <label>Dorm Name: </label>
            <input 
              type="text" 
              value={dormName}
              onChange={(e) => setDormName(e.target.value)}
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
      </div>
    </>
  );
}

export default App;

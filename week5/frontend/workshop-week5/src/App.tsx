import { useState } from 'react';
import axios from 'axios';
import assert from 'assert';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const apiUrl = 'http://localhost:8000/dorm/num_students?';

function App() {
  const [count, setCount] = useState<number>(0);
  const [activeDorm, setActiveDorm] = useState<string|undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);

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
      </div>
    </>
  );
}

export default App;

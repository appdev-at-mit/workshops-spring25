import { useState } from 'react';
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
    // this is terrible practice. don't do this.
    // in an actual app, add actual error handling lmao
    // we will go over integrating things in more detail next week
    // if you check the return type, it is Promise<void>
    fetch(apiUrl + new URLSearchParams({dormName: dormName}).toString(), {
      method: 'GET', 
      headers: {'content-type': 'application/json;charset=UTF-8'}}
     ).then(
       (res: Response) => res.json() as Promise<{count: number}>
     ).then(
       (data: {count: number}) => {
         console.log(data);
         console.log(data.count);
         setCount(data.count);
         setActiveDorm(dormName);
         setErrorMessage(undefined);
     }).catch(
       (error: any) => {
         setErrorMessage(error);
         console.log('error ', error);
       }
     );
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
        {errorMessage??<></>}
      </div>
    </>
  );
}

export default App;

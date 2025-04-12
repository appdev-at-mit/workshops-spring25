import { useState } from 'react';
import axios from 'axios';
import assert from 'assert';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const apiUrl = 'http://localhost:8000/api/dormCount?';

function App() {
  const [count, setCount] = useState<number|undefined>(undefined);

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
    const res = await fetch(apiUrl + new URLSearchParams({dormName: dormName}).toString(), {
      method: 'GET', 
      headers: {'content-type': 'application/json;charset=UTF-8'}}
     )

    console.log(res);
    const data = await res.json() as {count: number};
    console.log(data);
    console.log(data.count);
    setCount(data.count);
    return;

    axios.get<number>(apiUrl, {params: {dormName: dormName}}).then(
      (res) => {
        (setCount(res.data));
        console.log('res: ', res);
      }).catch(e => console.log(e));
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
        <p>
          number of students living there: {count ? count : 'unknown'}
        </p>
      </div>
    </>
  );
}

export default App;

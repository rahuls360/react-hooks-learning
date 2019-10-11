import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./styles.css";

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [users, setUsers] = useState({
    id: '',
    data: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, age)
  }

  useEffect(()=> {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => setUsers({
      id: '',
      data: res.data
    }))
    .catch(err => err)
  },[])

  useEffect(() => {
    if(users.id !== ''){
      axios.get(`https://jsonplaceholder.typicode.com/users/${users.id}`)
      .then(res => setUsers({
          id: users.id,
          data: res.data
        })
      )
      .catch(err => err)
    }
  },[users.id])

  return (
    <div className="App">
      <h1>Hello useState and useEffect</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} required/>
        <br /><br />
        <input value={age} onChange={e => setAge(e.target.value)} required/>
        <br /> <br />
        <button>Submit</button>
      </form>

      <br />
      <input value={users.id} onChange={e => setUsers({id:e.target.value})} required placeholder="Enter User id - 1 to 10"/>
      <br />
        {JSON.stringify(users.data)}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

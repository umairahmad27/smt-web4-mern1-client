import React, { useState, useEffect } from "react"
import axios from "axios"
import './App.css';

function App() {

  const [state, setState] = useState({
    name: "",
    age: "",
    userName: ""
  })
  const [documents, setDocuments] = useState([])
  const URL = "http://localhost:8000"

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    axios.get(`${URL}/getUsers`)
      .then((res) => {
        // console.log(res.data)
        setDocuments(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    let formData = { ...state }
    console.log(formData)

    axios.post(`${URL}/createUser`, formData)
      .then(() => {
        console.log("A new user has been successfully added.")
      })
      .catch(err => {
        console.error(err)
      })

    // console.log(formData)
  }

  return (
    <div className="App">
      <h1>Add User</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br /><br />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} /><br /><br />
        <input type="text" name="userName" placeholder="User Name" onChange={handleChange} /><br /><br />
        <button>Add User</button><br /><br />
      </form>
      <hr />
      <h1>All Users</h1>
      {documents.map((doc, i) => {
        return <div key={i}>
          <p><b>Name</b>: {doc.name}</p>
          <p><b>Age</b>: {doc.age}</p>
          <p><b>User Name</b>: {doc.userName}</p>
          <hr />
        </div>
      })}
    </div>
  );
}

export default App;

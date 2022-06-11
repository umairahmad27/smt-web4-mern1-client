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

  const handleSubmit = e => {
    e.preventDefault();

    let formData = { ...state }
    console.log(formData)

    axios.post(`${URL}/createUser`, formData)
      .then((res) => {
        console.log("A new user has been successfully added.")
      })
      .catch(err => {
        console.error(err)
      })

    // console.log(formData)
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

  const handleUpdate = doc => {
    console.log(doc)

    let newData = { id: doc._id, name: "Ahmad", age: 25 }

    axios.put(`${URL}/updateUser`, newData)
      .then((res) => {
        console.log("message from server", res.data)
        alert("User has been successfully updated.")
      })
      .catch((err) => {
        console.error(err)
      })

  }
  const handleDelete = doc => {
    console.log(doc)

    const { _id } = doc

    axios.delete(`${URL}/deleteUser/${_id}`)
      .then((res) => {
        console.log("User deleted")
        console.log("message from server", res.data)
        // setDocuments(res.data)
      }).catch((err) => {
        console.error(err)
      }).finally(() => {
        // console.log("finally worked")
      })
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
          <div>
            <button onClick={() => { handleUpdate(doc) }}>Update</button>&ensp;<button onClick={() => { handleDelete(doc) }}>Delete</button>
          </div>
          <hr />
        </div>
      })}
    </div>
  );
}

export default App;

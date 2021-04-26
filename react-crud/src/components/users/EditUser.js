import axios from "axios";
import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

const EditUser = () =>{
    let history = useHistory();
    const {id} = useParams();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    })
    
    // Destruction concept of ES6
    const{name, username, email, phone, website} = user;
    // Function to hold the changed value in AddUser
    const onInputChange = e =>{    
        // setUser here changes the target value for all the fields in the add user form one by one  
        // Spread Operator keeps the value of the previous field before updating the next value of e.target.email at the plce of name
        setUser({...user,[e.target.name]: e.target.value})
    }

    useEffect(() =>{
        loadUser();
    },[])
    
    // Function to post the data into the table
    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:3002/users/${id}`, user);
        // For redirection to the home page after post request is completed
        history.push("/"); 
    }
    
    //Function to load the data which is to be edited
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:3002/users/${id}`);
        setUser(result.data)
    }
    return (
        <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Edit A User</h2>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Username"
                name="username"
                value={username}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Your E-mail Address"
                name="email"
                value={email}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Phone Number"
                name="phone"
                value={phone}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Website Name"
                name="website"
                value={website}
                onChange={e => onInputChange(e)}
              />
            </div>
            <button className="btn btn-warning btn-block">Update User</button>
          </form>
        </div>
      </div>
    )
}

export default EditUser;
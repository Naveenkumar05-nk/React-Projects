import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Home = () => {
    const [users, setUser] = useState([]);

    //We need to call loadUsers in useEffect so we can initialize it when the page refreshes for once
    useEffect(() => {
        loadUsers();
    }, []);

    //Async Keyword makes the request process faster
    //Await holds the process until the get request isn't over
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3002/users");
        //To get only required data out of all
        //Reverse is used so the data is added on the top not bottom
        setUser(result.data.reverse())
    }
    
    const deleteUser = async id =>{
        await axios.delete(`http://localhost:3002/users/${id}`);
        loadUsers();
    }
    return (
        <div className="container">
            <div className="py-4">
                <h1>Home Page</h1>
                {/* Table from getbootstrap.com */}
                <table class="table border shadow">
                    <thead class="table-dark">
                        <tr >
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {   
                        // Map will be executed for all the 10 users one by one
                          users.map((user, index) => (
                             <tr>
                                 <th scope="row">{index + 1}</th>
                                 <td>{user.name}</td>
                                 <td>{user.username}</td>
                                 <td>{user.email}</td>
                                 <td>
                                     <Link className="btn btn-primary mr-2" to={`/users/${user.id}`} >View</Link>
                                     <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`}>Edit</Link>
                                     <Link className="btn btn-danger" onClick={() =>deleteUser(user.id)}>Delete</Link>
                                 </td>
                             </tr> 
                          ))
                      } 
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;
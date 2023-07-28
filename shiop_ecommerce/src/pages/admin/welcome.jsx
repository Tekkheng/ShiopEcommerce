/* eslint-disable no-unused-vars */
// import axios from "axios"
// import { useState, useEffect } from "react"
import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  // const [users,setUsers] = useState(null);
  // const getUsers = async()=>{
  //   const response = (await axios("http://localhost:5000/me")).data.name;
  //   setUsers(response);
  // }
  // useEffect(()=>{
  //   getUsers();
  //   console.log(users);
  // },[users]);

  return (
    // <div>
    //     <h1 className="mb-2 fs-4 fw-bold">Users</h1>
    //     <h2>Welcome {users !== null && users}</h2>
    // </div>

    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
    </div>
        
  )
}

export default Welcome
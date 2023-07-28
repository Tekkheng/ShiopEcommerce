/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react"

const Users = () => {
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  let [nomor] = useState(0);

    const getUsers = async () =>{
        const response = await axios(`${import.meta.env.VITE_SERVER_URL}/users`);
        const result = response.data.data
        setUsers(result);
        // console.log(users);
    }
    useEffect(()=>{
        getUsers();
    },[users]);

    const DeleteUsersById = async(id) =>{
      try{
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/${id}`);
      }catch(err){
        console.log(err);
      }
      navigate('/users');
    }

  return (
    <>
      <h1 className="mb-2 fs-4 fw-bold">Users</h1>
      <Link to="/addUsers">Add New Users</Link>
      <table className="table mt-5">
        <thead>
            <tr>
            <th><abbr title="no">No</abbr></th>
            <th><abbr title="name">Name</abbr></th>
            <th><abbr title="Played">Image</abbr></th>
            <th><abbr title="email">Email</abbr></th>
            <th><abbr title="role">Role</abbr></th>
            <th><abbr title="Goals against" className="">Action</abbr></th>
            </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user)=>{
              return (
                <tr key={user.id}>
                    <th>{nomor += 1}</th>
                    <td>{user.name}</td>
                    <td><img src={user.url} style={{width:"40px"}}/></td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                    <Link to={`/editUsers/${user.id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                    <Link to={`/deleteUsers/${user.id}`}>
                        <button className="btn btn-danger" onClick={DeleteUsersById.bind(this,user.id)}>Delete</button>
                    </Link>
                    </td>
                </tr>
              )
            })
          ) 
          : 'data users masih kosong!'}
        </tbody>
      </table>
    </>
  )
}

export default Users
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const Contact = () => {
    const [contact,setContact] = useState([]);
    let [nomor] = useState(0);
    
    const getContact = async()=>{
        const response = await axios(`${import.meta.env.VITE_SERVER_URL}/contact`);
        setContact(response.data.data.response);
    }
    
    useEffect(()=>{
        getContact();
    },[contact]);
    
    const deleteContactById = async (id)=>{
        try{
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/contact/${id}`);
        }catch(err){
            console.log(err.message);
        }
    }

  return (
    <>
    <h1 className="mb-2 fs-4 fw-bold">Contact</h1>
    <table className="table mt-5">
        <thead>
            <tr>
            <th><abbr title="no">No</abbr></th>
            <th>Name</th>
            <th><abbr title="no_hp">No Hp</abbr></th>
            <th><abbr title="email">Email</abbr></th>
            <th><abbr title="message">Message</abbr></th>
            <th><abbr title="Goals for">CreatedAt</abbr></th>
            <th><abbr title="Goals against">UpadatedAt</abbr></th>
            <th><abbr title="Goals against" className="">Action</abbr></th>
            </tr>
        </thead>
        <tbody>
            {contact.length > 0 ? (
                contact.map((c)=>{
                    return(
                        <tr key={c.id}>
                            <th>{nomor += 1}</th>
                            <td>{c.name}</td>
                            <td>{c.no_hp}</td>
                            <td>{c.email}</td>
                            <td>{c.message}</td>
                            <td>{c.createdAt}</td>
                            <td>{c.updatedAt}</td>
                            <td>
                                <Link to={`/deleteContact/${c.id}`}>
                                    <button className="btn btn-danger" onClick={deleteContactById.bind(this,c.id)}>Delete</button>
                                </Link>
                            </td>
                        </tr>
                        )
                })
            ) : <h1>data contact masih kosong!</h1>}
        </tbody>
    </table>
    </>
  )
}
export default Contact
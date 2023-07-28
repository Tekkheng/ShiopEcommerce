import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
const EditUsers = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [password,setPassword] = useState("");
    const [confPassword,setConfPassword] = useState("");

    const [file,setFile] = useState("");
    const [preview,setPreview] = useState("");

    const [error,setError] = useState(null);
    
    const {id} = useParams();
    const navigate = useNavigate();

    const loadImage = (e) =>{
      e.preventDefault();
      const getFile = e.target.files[0];
      setPreview(URL.createObjectURL(getFile));
      setFile(getFile)
    }
    const editUsers = async(e) =>{
      e.preventDefault();
      try{
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${id}`,{
            name: name,
            email: email,
            password: password,
            confPassword: confPassword,
            image: file,
            role: role,
        },{
          headers: {
          "Content-type": "multipart/form-data",
          },
        });
        setName("");
        setEmail("");
        setRole("");
        setPassword("");
        setConfPassword("");
        setFile("");
        setPreview("");
        setError(null);
        alert("Success Edit Users");
        navigate('/users');
      }catch(err){
        console.log(err);
        setError(err.response.data.msg);
      }
    }

  return (
    <>
        <div className="container">
            <div className="row justify-content-around">
                <div className="col-lg-7 col-md-8 col-sm-10">
                    <form onSubmit={editUsers}>
                        {error !== null && <h1 className="mt-5 mb-4">{error}</h1>}
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input className="input" type="text" name="name" placeholder="name..." onChange={(inpt)=>setName(inpt.target.value)} value={name}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" name="email" placeholder="email..." onChange={(inpt)=>setEmail(inpt.target.value)} value={email}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" name="password" placeholder="password..." onChange={(inpt)=>setPassword(inpt.target.value)} value={password}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control">
                                <input className="input" type="password" name="password" placeholder="confirm password..." onChange={(inpt)=>setConfPassword(inpt.target.value)} value={confPassword}/>
                            </div>
                        </div>

                        <div className="file mb-5">
                        <label className="file-label">
                            <label className="label pe-2">Image : </label>
                            <div className="control">
                                <input className="file-input" type="file" name="resume" onChange={loadImage}/>
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                                </span>
                            </div>
                        </label>
                        </div>
                        { preview ? (
                            <figure className="image is-128x128" style={{marginBottom:"10%"}}>
                                <img src={preview} alt="preview image"/>
                            </figure>
                        ) : ""}

                        <div className="field">
                            <label className="label">Role</label>
                            <div className="control">
                                <input className="input" type="role" name="role" placeholder="role..." onChange={(inpt)=>setRole(inpt.target.value)}/>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" type="submit">Submit</button>
                            </div>
                            <Link to="/users">
                                <button className="button is-link is-light">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditUsers
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddUsers = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [password,setPassword] = useState("");
    const [confPassword,setConfPassword] = useState("");

    const [file,setFile] = useState("");
    const [preview,setPreview] = useState("");

    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const loadImage = (e) =>{
        e.preventDefault();
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
        console.log(file.name);
    }
    const SubmitUsers = async (e)=>{ 
        console.log(name,email,role,file);
        e.preventDefault();

        try{
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, {
                name: name,
                email: email,
                role: role,
                password: password,
                confPassword: confPassword,
                image: file,
            }, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            setError(null);
            alert("Success add users")
            navigate("/users");
        }catch(err){
            console.log(err);
            setError(err.response.data.msg);
        }   
    }

    const ClearImage = (e) =>{
        e.preventDefault();
        setFile("");
        setPreview("");
    }
  return (
    <>
        <div className="container">
            <div className="row justify-content-around">
                <div className="col-lg-7 col-md-8 col-sm-10">
                    <form onSubmit={SubmitUsers}>
                        {error !== null && <h1 className="mt-4">{error}</h1>}
                        <div className="field mt-3">
                            {/* <p>{warning}</p> */}
                            <label className="label">Username</label>
                            <div className="control">
                                <input className="input" type="text" name="name" placeholder="name..." onChange={(inpt)=>setName(inpt.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">email</label>
                            <div className="control">
                                <input className="input" type="email" name="email" placeholder="email..." onChange={(inpt)=>setEmail(inpt.target.value)}/>
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
                                        {file ? file.name : "Choose a file…"}
                                    </span>
                                </span>
                            </div>
                        </label>
                        </div>
                        { preview ? (
                            <figure className="image is-128x128" style={{marginBottom:"10%"}}>
                                <div className="d-flex align-items-end">
                                    <img src={preview} alt="preview image"/>
                                    <button className="btn btn-light" onClick={ClearImage}>cancel</button>
                                </div>
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
                            <div className="control">
                                <Link to="/users">
                                    <button className="button is-link is-light">Cancel</button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddUsers
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const SubmitRegister = async(e) =>{
        e.preventDefault();
        try{
            const Register = {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
            }
            console.log(Register);
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/users`,Register);
            setError(null);
            
            setName("");
            setEmail("");
            setPassword("");
            setConfPassword("");

            alert("Berhasil Register!");
            navigate("/login");
        }catch(err){
            setError(err.response.data.msg);
            console.log(err);
        }
    }
    useEffect(()=>{
        console.log(Register);
        console.log();
    },[])

  return (
    <>
        <div className="hero has-background-grey-light is-fullheight is-fullwidth d-flex align-items-center justify-content-center" >
            <form onSubmit={SubmitRegister}>
                <div className="box bg bg-body-primary" style={{height:'32rem',width:'28rem'}}>
                    {error !== null && <p className="text-center">{error}</p>}
                    <Link className="nav-link" to="/"><IoArrowBack/></Link>
                    <div className="d-flex justify-content-center">
                        <h1 className="">Register Form</h1>
                    </div>
                    <div className="d-flex flex-column justify-content-between p-5">
                        <div className="mb-2">
                            <label htmlFor="name">Username</label>
                            <input className="form-control mt-2" type="text" id="name" placeholder="isi username..." name="name" onChange={(inpt)=>setName(inpt.target.value)} value={name} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <input className="form-control mt-2" type="email" id="email" placeholder="isi email@..." name="email" onChange={(inpt)=>setEmail(inpt.target.value)} value={email}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input className="form-control mt-2" type="password" id="password" placeholder="isi password..." name="password" onChange={(inpt)=>setPassword(inpt.target.value)} value={password}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Confirm Password</label>
                            <input className="form-control mt-2" type="password" id="confpassword" placeholder="confirm password..." name="confpassword" onChange={(inpt)=>setConfPassword(inpt.target.value)} value={confPassword}/>
                        </div>
                        <div className="mt-4">  
                            <button className="btn btn-success d-block" type="submit" style={{width:'100%'}}>Register</button>
                        </div>
                        <div className="mt-2 justify-content-center align-items-center d-flex">
                            <span className="text-secondary fs-6">Already Register?</span>
                            <Link to="/login" className="nav-link">Login</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default Register
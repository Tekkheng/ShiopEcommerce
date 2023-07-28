import { IoArrowBack } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(()=>{
        if(user || isSuccess){
            if(user.role === "admin"){
                navigate('/dashboard');
            }else if(user.role === "users"){
                navigate('/');
            }else{
                navigate('/login');
            }
        }
        dispatch(reset());
    },[user,isSuccess,dispatch,navigate]);

    const SubmitLogin = (e) => {
        e.preventDefault()
        dispatch(LoginUser({ email, password }));
    };
    
  return (
    <div className="hero has-background-grey-light is-fullheight is-fullwidth d-flex align-items-center justify-content-center" >
        <form onSubmit={SubmitLogin}>
            <div className="box bg bg-body-primary" style={{height:'25rem',width:'23rem'}}>
                {isError && <p className="text-center">{message}</p>}
                <Link className="nav-link" to="/"><IoArrowBack/></Link>
                <div className="d-flex justify-content-center">
                    <h1 className=" mb-2">Login Form</h1>
                </div>
                <div className="d-flex flex-column justify-content-between p-5">
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        {/* <input className="form-control mt-2" type="email" id="email" placeholder="isi email@..." name="email" onChange={(inpt)=>inputData(inpt.target.value)} value={email}/> */}
                        <input className="form-control mt-2" type="email" id="email" placeholder="isi email@..." name="email" onChange={(inpt)=>setEmail(inpt.target.value)} value={email}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password">Password</label>
                        <input className="form-control mt-2" type="password" id="password" placeholder="isi password..." name="password" onChange={(inpt)=>setPassword(inpt.target.value)} value={password}/>
                    </div>
                    <div className="mt-5">  
                        <button className="btn btn-success d-block" type="submit" style={{width:'100%'}}>{isLoading ? 'Loading...' : 'Login'}</button>
                    </div>
                    <div className="mt-5 justify-content-center align-items-center d-flex">
                        <span className="text-secondary fs-6">Not registered?</span>
                        <Link to="/register" className="nav-link">Create an account</Link>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login
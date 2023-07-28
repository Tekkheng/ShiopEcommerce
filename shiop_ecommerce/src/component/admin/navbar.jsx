// import { FaAppStore, FaUser } from 'react-icons/fa';
import { IoLogOut, IoPerson, IoStorefront } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../../features/authSlice';

export const NavbarAdmin = () =>{
    // const [data,setData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { user } = useSelector((state) => state.auth);
    const { user, isSuccess } = useSelector((state) => state.auth);

    const Logout = () =>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/login");
    }
    // useEffect(()=>{
    //     const getMe = async() =>{
    //         const response = (await axios("http://localhost:5000/me")).data;
    //         setData(response);
    //     } 
    //     getMe();
    // },[data]);

    return(
        <nav className="navbar navbar-expand-lg bg bg-body-tertiary sticky-top text-center">
            <div className="container-fluid">
                <h5 className="navbar-brand fs-5 fw-bold" to="/"><span className='pe-1'><IoStorefront/></span>Admin</h5>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button> */}

                {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}

                <div className="">  
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            {isSuccess ? (
                                user.role === "admin" ? (
                                    <li className="nav-item dropdown position-absolute d-flex flex-column" style={{top:"5px",right:"70px"}}>
                                        <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown">
                                            <img className="rounded"src={user.url} style={{width: "30px",maxHeight: "30px"}}/>
                                            <p>{user.name}</p>
                                        </a>
                                        <ul className="dropdown-menu position-absolute">
                                            <li><Link className="dropdown-item" to={`/profile/${user.uuid}`}><span className='pe-1'><IoPerson/></span>Edit Profile</Link></li>
                                            <li>
                                                <button onClick={Logout} className="dropdown-item"><span className='pe-1'><IoLogOut/></span>Logout</button>
                                            </li>
                                        </ul>
                                    </li>
                                ) : ""
                            ) : ""}
                            {/* {user.role === "admin" ? (
                                <li className="nav-item dropdown position-absolute d-flex flex-column" style={{top:"5px",right:"70px"}}>
                                    <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown">
                                        <img className="rounded"src={user.url} style={{width: "30px",maxHeight: "30px"}}/>
                                        <p>{user.name}</p>
                                    </a>
                                    <ul className="dropdown-menu position-absolute">
                                        <li><Link className="dropdown-item" to={`/profile/${user.uuid}`}><span className='pe-1'><IoPerson/></span>Edit Profile</Link></li>
                                        <li>
                                            <button onClick={Logout} className="dropdown-item"><span className='pe-1'><IoLogOut/></span>Logout</button>
                                        </li>
                                    </ul>
                                </li>
                            ) : ("")} */}
                        </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarAdmin;
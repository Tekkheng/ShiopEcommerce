import { FaCartArrowDown } from 'react-icons/fa';
import { IoLogOut, IoPerson, IoStorefront } from 'react-icons/io5';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";
import axios from 'axios';
import { useEffect,useState } from 'react';
import { getMe } from "../../features/authSlice";

export const Navbar = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/");
      }
    }, [isError, navigate]);

    const { user } = useSelector((state) => state.auth);

    const [data,setData] = useState([]);
    const [cart,setCart] = useState([]);
  
    const Logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
    };

    useEffect(() =>{
        const getUser = async()=>{
            try{
                const response = await axios(`${import.meta.env.VITE_SERVER_URL}/me`);
                const hasil = response.data;
                setData(hasil);
            }catch(err){
                console.log(err);
            }
        };
        getUser();
    },[data]);

    useEffect(()=>{
        const getCart = async()=>{
            const response = (await axios(`${import.meta.env.VITE_SERVER_URL}/cart/${data.id}`)).data.dataCart;
            setCart(response);
        }
        getCart();
    },[cart,data.id]);
    
    return(
        <nav className="navbar navbar-expand-lg bg bg-body-tertiary sticky-top text-center">
            <div className="container">
                <Link className="navbar-brand fs-5 fw-bold" to="/"><span className='pe-1'><IoStorefront/></span>SHIOP</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <div className='mx-auto'>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/product">Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className="navbar-nav mb-4 mb-lg-0 mb-sm-2">
                    {user ? (
                        user.role === "users" ? (   
                            <li className="nav-item dropdown position-absolute" style={{top:"-10px",right:"30px"}}>
                                <ul className="navbar-nav mb-4 mb-lg-0">
                                    <li className="nav-item me-5 mt-3">
                                        <Link className="nav-link" to={`/cart/${user.id}`}><FaCartArrowDown/> Cart {cart.length}</Link>
                                    </li>
                                </ul>
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
                        ) : (   
                            <li className="nav-item">
                                <Link className="nav-link" to="/login"><IoPerson/> Login</Link>
                            </li>
                        )
                    ) : (   
                        <li className="nav-item">
                            <Link className="nav-link" to="/login"><IoPerson/> Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
        
    )
}

export default Navbar;
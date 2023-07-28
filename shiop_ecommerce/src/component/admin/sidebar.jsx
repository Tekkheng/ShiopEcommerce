import { Link, useNavigate } from 'react-router-dom';
import { IoPerson,IoHome,IoLogOut,IoPricetag } from 'react-icons/io5';
import { LogOut, reset } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/login");
    };

  return (
    <>
    <aside className="menu has-shadow ps-2">
    <p className="menu-label">
        General
    </p>
    <ul className="menu-list">
        <Link to="/dashboard" className='is-active'><IoHome/> DashBoard</Link>
    </ul>
    <p className="menu-label">
        Admin
    </p>
    <ul className="menu-list">
        <li><Link to="/getProduct" ><IoPricetag/> Product</Link></li>
        <li><Link to="/users" ><IoPerson/> Users</Link></li>
        <li><Link to="/getContact" ><IoPerson/> Contact</Link></li>
    </ul>
    <p className="menu-label">
        Setting
    </p>
    <ul className="menu-list">
        <li>
            <a className="btn btn-transparent text-start" onClick={Logout}><IoLogOut/> Logout</a>
        </li>
    </ul>
    </aside>
    </>
  )
}

export default Sidebar
import "./Header.css";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../utils/Context";
import Logo from '../../assets/logo.png';

function Header(){

    const {loginInfo} = useContext(Context)

    function logoutFunc(){
        window.location.reload();
    }

    return(
        <div className="header-main-div">
            <div className="top-nav">
                <span className="top-nav-text">Hello, {loginInfo.status? loginInfo.name : "Guest"}</span>
                <div className="top-nav-links-div">
                    <ul>
                        {
                            !loginInfo?.status ? 
                                <>
                                    <li><Link to={'/login'} className="top-nav-links">User Login</Link></li>
                                    <li><Link to={'/admin'} className="top-nav-links">Admin Login</Link></li>
                                </>
                            : ((loginInfo?.role === "User") ?  
                                <>
                                    <li><Link to={'/userdashboard'} className="top-nav-links">User Dashboard</Link></li>
                                    <li><Link onClick={logoutFunc} className="top-nav-links">Logout</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to={'/adminpanel'} className="top-nav-links">Admin Panel</Link></li>
                                    <li><Link onClick={logoutFunc} className="top-nav-links">Logout</Link></li>
                                </> )
                        }
                    </ul>
                </div>
            </div>
            <div className="main-nav">
                <Link to='/'>
                    <img src={Logo} alt="" className="nav-logo-img"/>
                    <span className="main-nav-heading">MVOGMS - MERN</span>
                </Link>
                <ul>
                    <li><Link to={'/'} className="main-nav-links">Home</Link></li>
                    <li><Link to={'/products'} className="main-nav-links">Products</Link></li>
                    <li><Link to={'/about'} className="main-nav-links">About Us</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
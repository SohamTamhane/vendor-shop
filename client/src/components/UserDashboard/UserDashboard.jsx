import './UserDashboard.css';
import { Context } from '../../utils/Context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function UserDashboard(){
    const {loginInfo} = useContext(Context);

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="User"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">User Dashboard</div>
                    <div className="admin-panel-options-div">
                        <Link to='/userdashboard/profile' className="admin-panel-options">Profile Details</Link>
                        <Link to='/userdashboard/manageorders' className="admin-panel-options">View Orders</Link>
                        <Link to='/userdashboard/addproducts' className="admin-panel-options">Notification</Link>
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as Admin</div>
        }
        </>
    )
}
export default UserDashboard;
import './UserDashboard.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function ViewOrders(){
    const {loginInfo} = useContext(Context);
    const [orders, setOrders] = useState([]);

    async function getUsersFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/vieworders', {email: loginInfo?.email}).then(res=>{
            setOrders(res.data);
        })
    }

    useEffect(()=>{
        getUsersFunc();
    }, [])

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="User"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">View Orders</div>
                    <div className="admin-panel-div-box">
                        {orders?.data?.orders?.map((order)=>(
                            <div key={order?.orderid} className="option-main-outer-box">
                                <div className="user-name-title">{order?.title}</div>
                                <div className="user-email-title">OrderID: {order?.orderid}</div>
                                <div className="user-mobile-title">Vendor: {order?.vendor}</div>
                                <div className="user-mobile-title">Qty: {order?.qty}</div>
                                <div className="user-mobile-title">Price: {order?.price}</div>
                                <div className="user-mobile-title-status">Status: {order?.status ? "Accepted":"Pending"}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as Admin</div>
        }
        </>
    )
}
export default ViewOrders;
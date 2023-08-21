import "./AdminPanel.css";
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function ManageOrder(){

    const {loginInfo} = useContext(Context);
    const [orders, setOrders] = useState([]);

    async function getUsersFunc(){
        await axios.get(process.env.REACT_APP_BASE_URL+'/auth/allorders').then(res=>{
            setOrders(res.data);
        })
    }

    async function acceptOrders(orderid){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/acceptorder', {orderid}).then(res=>{
            getUsersFunc();
        }).catch(error=>{console.log(error)});

    }

    useEffect(()=>{
        getUsersFunc();
    }, [])

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="Admin"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">Manage Orders</div>
                    <div className="admin-panel-div-box">
                        {orders?.data?.orders?.map((order)=>(
                            <div key={order?.orderid} className="option-main-outer-box">
                                <div className="user-name-title">{order?.title}</div>
                                <div className="user-email-title">OrderID: {order?.orderid}</div>
                                <div className="user-email-title">User: {order?.user}</div>
                                <div className="user-mobile-title">Vendor: {order?.vendor}</div>
                                <div className="user-mobile-title">Qty: {order?.qty}</div>
                                <div className="user-mobile-title">Price: {order?.price}</div>
                                <div className="user-mobile-title">Status: {order?.status ? "Accepted":"Pending"}</div>
                                <div>
                                    {!order?.status? <button onClick={()=>acceptOrders(order?.orderid)} className="order-accept-btn">Accept Order</button> : ""}
                                </div>
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
export default ManageOrder;
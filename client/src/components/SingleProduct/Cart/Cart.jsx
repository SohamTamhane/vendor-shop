import "../SingleProduct.css";
import { Context } from "../../../utils/Context";
import { useContext, useState} from "react";
import CartCard from "./CartCard";
import axios from "axios";

function Cart(){

    const {loginInfo, cart} = useContext(Context);
    const [loginStatus, setLoginStatus] = useState(undefined);

    async function placeOrderFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/order', {cart, email: loginInfo.email}).then(res=>{
            setLoginStatus("Order Placed Successfully");
        }).catch(error=>{
            setLoginStatus(error?.response?.data?.message);
        })
    }

    return(
        <>
            <div className="page-title">Your Cart</div>
            <div className="single-product-main-div">
                {cart?.map((elm)=>(
                    <CartCard id={elm?._id} key={elm?._id} title={elm?.title} image={process.env.REACT_APP_FILE_URL+elm?.image[0]} price={elm?.price} qty={elm?.qty}/>
                ))}
            </div>
            <br />
            <div className="login-status-div">{loginStatus}</div>
            <div className="place-order-btn-div">
                <button onClick={placeOrderFunc} className="place-order-btn">Place Order</button>
            </div>
        </>
    )
}

export default Cart;
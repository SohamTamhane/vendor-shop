import './AdminPanel.css';
import { Context } from '../../utils/Context';
import { useContext, useState } from 'react';
import axios from 'axios';

function AddLabour(){

    const {loginInfo} = useContext(Context);

    const [loginStatus, setLoginStatus] = useState(undefined);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    
    async function addLabourFunc(){
        if(name!=="" && email!=="" && mobile!==""){
            await axios.post(process.env.REACT_APP_BASE_URL+'/labour/create', {name, email, mobile}).then(res=>{
                setLoginStatus("Labour Added Successfully");
            }).catch(error=>{
                setLoginStatus(error?.response?.data?.message);
            })
        }
        else{
            setLoginStatus("Please Fill All the Details");
        }
        
    }

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="Admin"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">Add Labour</div>
                    <div className="admin-panel-div-box">
                        <div className="login-form-div">
                            <div className="form-label">Labour Name:</div>
                            <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="title-field" className="login-input-field"/>
                            <div className="form-label">Email:</div>
                            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" id="category-field" className="login-input-field"/>
                            <div className="form-label">Mobile:</div>
                            <input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} type="number" id="category-field" className="login-input-field"/>
                            <div className="login-status-div">{loginStatus}</div>
                            <br/>
                            <div className="submit-btn-div">
                                <button onClick={addLabourFunc} className="submit-btn">Add Labour</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as Admin</div>
        }
        </>
    )
}
export default AddLabour;
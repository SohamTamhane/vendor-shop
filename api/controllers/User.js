const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async(req, res)=>{
    try{
        const {name, email, password, confirmPassword, mobile, address1, address2, city, state, pincode, role} = req.body;
        if(!name || !email || !password || !mobile || !address1 || !address2 || !city || !state || !pincode || !role){
            return res.status(400).json({
                success: false,
                message: "Please Fill all the Details"
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password must be Same"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User Already Exists"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        const response = await User.create({name, email, password: hashedPassword, mobile, address1, address2, city, state, pincode, role});

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const userDetails = await User.findOne({email, role});
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message: "User is not Registered"
            })
        }

        if(await bcrypt.compare(password, userDetails.password)){
            return res.status(200).json({
                success: true,
                message: "Login Successful",
                name: userDetails.name
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.orders = async (req, res) => {
    try{
        const {cart, email} = req.body;
        if(!cart){
            return res.status(401).json({
                success: false,
                message: "Please Add Products to the Cart"
            })
        }

        async function updateOrders(elm){
            let ordersResponse = await User.updateOne({email},{$push: {orders: elm}});
            let adminOrdersResponse = await User.updateOne({role: "Admin"},{$push: {orders: elm}});
        }

        cart.map((elm)=>{updateOrders(elm)})
        
        return res.status(200).json({
            success: true,
            message: "Order Placed Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error with orders",
            error: error.message
        })
    }
}

exports.users = async (req, res) => {
    try{
        const usersRes = await User.find({role: "User"}).select({name: 1, email: 1, mobile: 1, _id: 0});
        return res.status(200).json({
            success: true,
            message: "Users Details Fetched Successfully",
            data: usersRes
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error with orders",
            error: error.message
        })
    }
}

exports.allorders = async (req, res) => {
    try{
        const orderResponse = await User.findOne({role: "Admin"}).select({orders: 1, _id: 0})
        return res.status(200).json({
            success: true,
            message: "Orders Fetched Successfully",
            data: orderResponse
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error with orders",
            error: error.message
        })
    }
}

exports.acceptOrder = async (req, res) => {
    try{
        const {orderid} = req.body;
        const orderResponse = await User.updateMany({orders: {$elemMatch: {orderid: orderid}}}, {$set: {"orders.$.status": true}})
        return res.status(200).json({
            success: true,
            message: "Order Accepted Successfully",
            data: orderResponse
        })
        
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error with orders",
            error: error.message
        })
    }
}


exports.viewOrders = async (req, res) => {
    try{
        const {email} = req.body;
        const viewOrdersResponse = await User.findOne({email});
        return res.status(200).json({
            success: true,
            message: "Orders Fetched Successfully",
            data: viewOrdersResponse
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error with orders",
            error: error.message
        })
    }
}
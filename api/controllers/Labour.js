const Labour = require('../models/Labour');

exports.create = async (req, res) => {
    try{
        const {name, email, mobile} = req.body;

        if(!email || !name || !mobile){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const existingLabour = await Labour.findOne({email});
        if(existingLabour){
            return res.status(401).json({
                success: false,
                message: "Labour Already Exists"
            })
        }

        const response = Labour.create({name, email, mobile});
        return res.status(200).json({
            success: true,
            message: "Labour Added Successfully"
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
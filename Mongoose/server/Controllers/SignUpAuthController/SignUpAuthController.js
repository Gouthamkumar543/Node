const SignUpModal = require("../../Models/SignUpModal/SignUpModal")
const bcrypt = require("bcrypt")

async function SignUpAuthController(req,res) {
    const {name,email,password,role} = req.body
    try{
        const AlreadyExists = await SignUpModal.findOne({email})
        if(AlreadyExists){
            console.log("already exists");
            return res.status(400).send("Already user exists")
        }
        const hashPassword =await bcrypt.hash(password,10)
        // console.log(hashPassword);
        const newRecruiter = new SignUpModal({
            name,
            email,
            password:hashPassword,
            role
        })
        await newRecruiter.save()
    }catch(err){
        console.log(err);
    }
}

module.exports = SignUpAuthController
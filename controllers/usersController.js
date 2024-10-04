const User = require("../models/User");

const getUser= (req, res)=>{
    res.status(200).json({message:'yes'})
}
const deleteUser= (req, res)=>{
    res.status(200).json({message:'yes'})
}
const updateUser= (req, res)=>{
    res.status(200).json({message:'yes'})
}
module.exports={
    getUser,
    deleteUser,
    updateUser
}
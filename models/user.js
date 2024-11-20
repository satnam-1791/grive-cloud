const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        minLength:[3,'Min length is required is 3']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:[5,'Min length is required is 5']
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[3,'Min length is required is 3']
    }
},{timestamps:true})


const User = mongoose.model('user', UserSchema)

module.exports = User
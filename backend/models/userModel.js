const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const {Schema} = mongoose

const userSchema = new Schema({
    name : {
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email :{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate : [validator.isEmail , "Please Enter a valid Email"]
    },
    password : {
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength : [8,"Password should be minimum of 8 word"]
    },
    // bio : {
    //     type:String,
    //     default : 'Hey There I am using ChatClass',
    // },
    // location : {
    //     type : string , 
    //     default : "India"
    // },
    avatar:{
        public_id:{
            type :String,
            required:true
        },
         url:{
            type :String,
            required:true
        }
       },
       resetPasswordToken : String,
       resetPasswordExpire :Date
},{
    timestamps : true,
})


//Encryption password
// pre :- executing this before save 
userSchema.pre("save",async function(next){
     if(!this.isModified("password")){
        next()
     }
     this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
const JWT_SECRET = "KJGFSDJKGJFDLKGJHFOIAHJSFKAJHKAJ"
const JWT_EXPIRE = "5d"

userSchema.methods.getJWTToken = function() { //jwt.sign => it is used to create a token 
    return jwt.sign({id : this._id},JWT_SECRET,{ // id => kispe token lagana hai , in this case it is id a\
        expiresIn : JWT_EXPIRE,  //kab expore hoga
    })
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword,next){
    return (await bcrypt.compare(enteredPassword,this.password))
}


//Generating Password Reset TOken:_
userSchema.methods.getResetPasswordToken = function(){
   //Generatimg TOken
   const resetToken = crypto.randomBytes(20).toString("hex")
   this.resetPasswordToken = crypto.createHash("sha56").update(resetToken).digest("hex")
   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000 //converting it into millisec
   
   return resetToken
}


module.exports = mongoose.model("User",userSchema)
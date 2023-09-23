const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    pic : {
        type:String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Favatar&psig=AOvVaw0l8f_XIawdCkZ6cS-6iguj&ust=1695446632808000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNiozIK9vYEDFQAAAAAdAAAAABAD"
    }
},{
    timestamps : true,
})

module.exports = mongoose.model("User",userSchema)
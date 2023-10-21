import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String ,
        required: true ,
        min:2 ,
        max : 50 ,
    },
    lastName:{
        type: String ,
        required: true ,
        min:2 ,
        max : 50 ,
    },
    email:{
        type: String ,
        required: true ,
        Unique: true ,
        max : 50 ,
    },
    password:{
        type: String ,
        required: true ,
        min:8 ,
        max : 50 ,
    },
    friends:{
        type: Array ,
        default: [] ,
       
    },
    picture:{
        type: String ,
        default : "",
    },
    location:String ,
    occupation : String ,
    viewdProfile: Number ,
    impressions : Number
},{timestamps: true });

const User = mongoose.model("User",UserSchema);
export default User ; 
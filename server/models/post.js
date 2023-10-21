import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String ,
        require: true ,
        max:50
    },
    firsname:{
        type: String ,
        require: true ,
      
    },
    lastname:{
        type: String ,
        require: true ,
      
    },
    location:{
        type: String ,
        require: true ,
      
    },
    disciption : String ,
    picturePath : String ,
    userPicturePath : String ,
    likes : {
        type: Map ,
        typeof : Boolean 
    },
    comments : {
        type : Array ,
        default : []
    }
},
{timestamps: true })

const Post = new mongoose.model("Post",postSchema);
export default Post ; 
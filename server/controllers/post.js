import Post from "../models/post.js";
import post from "../models/post.js"
import User from "../models/User.js"

const getposts = async(req,res)=>{
    try{
     
        const posts =await  post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(404).json({message: err.message})
    }
    

}
const createpost = async (req,res)=>{
    try{
        const userid = req.prams;
        const disciption = req.disciption ;
        const user = await User.findbyId(userid);
         const newpost = new Post({userId : user.id ,firstname : user.firsname ,lastname:user.lastname,location: user.location
       , disciption,picturePath,usepicturePath : user.picture ,likes:{},comments:[]});
       await newpost.save();
       const post = await Post.find();
    }catch(err){
   res.status(409).json({message: err.message})
    }
}

export const getPosts= async(res,req)=>{
    try{  
     const posts= await Post.find();
    res.status(201).json(posts);
    }catch(err){
        res.status(409).json({message: err.message})
    }
}

const getuserposts = async(res,req)=>{
    try{
        const userid = req.params ; 
        const posts= await Post.find({userid});
        res.status(201).json(posts);
    }catch(err){
        res.status(409).json({message: err.message})
    }
}
//UPDATES 
const likepost = async(req,res)=> {
    try{
     const {id} = req.params  ; 
     const post = await Post.findbyId(id) ;
     const isliked = post.likes.get(post.userId);
     if (isliked){
        post.like.delete(post.userId);
     }else{
        post.like.set(post.userId,true);
     }
     const updatedPost = await Post.findbyIdAndUpdate(id,{likes:post.likes},{
        new:true 
     })
     
     res.status(201).json(updatedPost);
    }catch(err){
        res.status(409).json({message: err.message});
    }
}
export {likepost,createpost,getuserposts,getposts}

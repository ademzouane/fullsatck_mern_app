import User from "../models/User.js"

export const getUser = async(res,req)=>{
     try{
        const { id }= req.prams ; 
        const user = await User.findById(id);
        res.status(200).json(user).end();

     }catch(err){
        res.status(404).json({message: err.message}).end();
     }
}
 
export const getUserFriends= async(res,req)=>{
           try{
            const {id}= req.prams ;  
            const user = User.findById(id);
            const friends = await Promise.all(
                user.friends.map((id)=> user.findById(id))
            );
            const fromattedfriends = friends.map((item)=>
             {item._id,item.firstName,item.lastName,item.occupation,item.location,item.picturePath}
            )
            res.status(200).json(fromattedfriends);
        
           }catch(err){
   res.status(404).json({message:err.message})
           }
};

// update 
export const addRemoveFriend = async(req,res)=>{
    try{
        const {id,friendId}= req.prams ;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)){
    user.friends= user.friends.filter((id)=> id!== friendId);
    friend.friends = friend.friends.filter((id)=> id !== id )
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            user.friends.map((id)=> user.findById(id))
        );
        const fromattedfriends = friends.map((item)=>
        {item._id,item.firstName,item.lastName,item.occupation,item.location,item.picturePath}
       )
       res.status(200).json(fromattedfriends);
    }catch(err){
     res.status(404).json({message: err.message});
    }
}
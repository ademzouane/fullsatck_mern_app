import express from "express"
import verifyToken  from "../middelware/auth.js";
import {getposts,
getuserposts,likepost
} from "../controllers/post.js"

const postRoute= express.Router();
postRoute.get("/",verifyToken,getposts);
postRoute.get("/:userid/posts",verifyToken,getuserposts);
postRoute.patch("/:id/like",verifyToken,likepost);

export default postRoute ; 
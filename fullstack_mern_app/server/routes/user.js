import express from 'express'
import {
    getUser,
    getUserFriends,
    addRemoveFriend
}from "../controllers/User.js";
import {verifyToken} from "../middelware/auth.js"


const router = express.Router();
// Read
router.get("/:id",getUser);
router.get("/:id/friends",verifyToken,getUserFriends);
// Update
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

export default router ; 
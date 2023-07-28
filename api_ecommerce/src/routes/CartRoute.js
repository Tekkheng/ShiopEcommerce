import express from "express"
import {getAllCart, addCart,updateCart, getCartById, deleteCartById} from "../controller/CartController.js";
// import { VerifyUser, AdminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// router.get("/",VerifyUser,getAllCart);
// router.post("/",VerifyUser,addCart);
// router.put("/:productId/:userId",VerifyUser,updateCart);
// router.get("/:userId",VerifyUser,getCartById);
// router.delete("/:productId/:userId",VerifyUser,deleteCartById);

router.get("/",getAllCart);
router.post("/",addCart);
router.put("/:productId/:userId",updateCart);
router.get("/:userId",getCartById);
router.delete("/:productId/:userId",deleteCartById);

export default router
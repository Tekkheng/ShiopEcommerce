import express from "express";
import { getAllProducts, getProductById, addProduct, editProductById, deleteProductById } from "../controller/ProductController.js";
// import { VerifyUser, AdminOnly } from "../middleware/AuthUser.js";

const router = express.Router();
// router.get('/',getAllProducts);
// router.get('/:id',getProductById);
// router.post('/',VerifyUser,AdminOnly,addProduct);
// router.put('/:id',VerifyUser,AdminOnly,editProductById);
// router.delete('/:id',VerifyUser,AdminOnly,deleteProductById);

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.post('/',addProduct);
router.put('/:id',editProductById);
router.delete('/:id',deleteProductById);

export default router
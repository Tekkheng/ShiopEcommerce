import express from "express";
import { getAllContact, addContact, getContactById, deleteContactById } from "../controller/ContactController.js";
// import { VerifyUser,AdminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// router.get('/',VerifyUser,AdminOnly,getAllContact);
// router.post('/',VerifyUser,addContact);
// router.get('/:id',VerifyUser,AdminOnly,getContactById);
// router.delete('/:id',VerifyUser,AdminOnly,deleteContactById);

router.get('/',getAllContact);
router.post('/',addContact);
router.get('/:id',getContactById);
router.delete('/:id',deleteContactById);

export default router;
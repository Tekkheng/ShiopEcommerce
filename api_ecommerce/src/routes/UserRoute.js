import express from "express";
import { getUser, getUserById, addUser, editUserById, deleteUserById, editUserProfile } from "../controller/UserController.js";
// import { VerifyUser, AdminOnly } from "../middleware/AuthUser.js";

// harus login baru bisa akses route getUser
// import VerifyUser from "../middleware/AuthUser.js";
// router.get('/',VerifyUser,getUser);

const router = express.Router();
// router.get('/users',getUser);
// router.post('/users',addUser);
// router.get('/users/:id',AdminOnly,getUserById);

// router.put('/usersProfile/:uuid',editUserProfile);
// router.put('/users/:id',editUserById);
// router.delete('/users/:id',AdminOnly,deleteUserById);

router.get('/users',getUser);
router.post('/users',addUser);
router.get('/users/:id',getUserById);
router.put('/usersProfile/:uuid',editUserProfile);
router.put('/users/:id',editUserById);
router.delete('/users/:id',deleteUserById);


export default router;
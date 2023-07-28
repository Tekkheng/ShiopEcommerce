import express from "express"
import pay from "../controller/Payment.js";

const router = express.Router();

router.post("/process-transaction",pay);

export default router

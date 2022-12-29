import express from "express";
import { getTransactions, getTransaction,   createTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.get('/', getTransactions);

router.get('/transaction/:id', getTransaction);

router.post('/create', createTransaction);

export default router;

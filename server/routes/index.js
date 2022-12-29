import express from "express";
import { getTransactions, getTransaction, createTransaction, updateTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.get('/', getTransactions);

router.get('/transaction/:id', getTransaction);

router.post('/create', createTransaction);

router.patch('/edit/:id', updateTransaction);

export default router;

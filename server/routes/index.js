import express from "express";
import { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.get('/', getTransactions);

router.get('/transaction/:id', getTransaction);

router.post('/create', createTransaction);

router.patch('/edit/:id', updateTransaction);

router.delete('/delete/:id', deleteTransaction);

export default router;

import express from "express";
import { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction, validationRules, handleValidationErrors } from "../controllers/transactionController.js";

const router = express.Router();

router.get('/', getTransactions);

router.get('/transaction/:id', getTransaction);

router.post('/create', validationRules, handleValidationErrors, createTransaction);

router.patch('/edit/:id', validationRules, handleValidationErrors, updateTransaction);

router.delete('/delete/:id', deleteTransaction);

export default router;

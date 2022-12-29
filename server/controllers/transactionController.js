import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const validationRules = [
  body('description', 'Please enter a description').trim().not().isEmpty(),
  body('type', 'You must select a  type!').trim().isIn(['credit', 'debit']),
  body('date', 'Please select a date').trim().not().isEmpty(),
  body('amount', 'Please enter an amount greater than 0').trim().custom(value => parseInt(value) > 0)
];

export const handleValidationErrors = (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length) {
    res.status(400);
    console.log({ errors });
    return res.json({ errors });
  }
  next();
}

export const getTransactions = async (req, res) => {
  
  try {
    const transactions = await Transaction.find()
      .sort({ date: 1 });
    res.status(200);
    res.json(transactions);
  } catch (error) {
    res.status(404);
    res.json({error});
    console.log({message: error.message});
  }

}

export const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    res.status(200);
    res.json(transaction);
  } catch (error) {
    res.status(404);
    res.json({ error });
    console.log({ message: error.message });
  }
}

export const createTransaction = async (req, res) => {
  const { description, type, amount, date } = req.body;
  
  const newTransaction = new Transaction({
    description, type, amount, date
  });
  try{
    await newTransaction.save();
    res.status(201);
    res.json(newTransaction);
  } catch (error) {
    res.status(409);
    res.json({ error })
    console.log({ message: error.message });
  }
}

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { description, type, amount, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No transaction with id: ${id}`);

  const updatedTransaction = { description, type, amount, date, _id: id }

  try{
    await Transaction.findByIdAndUpdate(id, updatedTransaction);
    res.status(201);
    res.json(updatedTransaction);
  } catch (error) {
    res.status(409);
    console.log({ message: error.message });
  }
}

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No transaction with id: ${id}`);
  
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Deleted Successfully!' });
  } catch (error) {
    res.status(409);
    console.log({ message: error.message });
  }

}

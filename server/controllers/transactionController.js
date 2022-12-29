import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

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
    console.log({message: error.message});
  }
}

export const createTransaction = async (req, res) => {
  const newTransaction = new Transaction(req.body);
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

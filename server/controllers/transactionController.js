import Transaction from "../models/Transaction.js";

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
    const transaction = await Transaction.findById(id)
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

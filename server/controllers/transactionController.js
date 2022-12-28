import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  
  try {
    const transactions = await Transaction.find();
    console.log({transactions})
    res.status(200);
    res.json(transactions);
  } catch (error) {
    res.status(404);
    res.send('Error: ', res.status);
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
    console.log({ message: error.message });
  }
}

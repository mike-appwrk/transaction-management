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

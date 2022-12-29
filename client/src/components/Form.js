import { useState } from "react";
import { createTransaction } from "../api";
import { useNavigate } from "react-router-dom";

function Form () {

  const [transaction, setTransaction] = useState({
    description: '',
    amount: 0,
    type: 'credit',
    date: ''
  });

  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    async function postTransaction() {
      try {
        const transactionRes = await createTransaction(transaction);
        console.log({ transactionRes });
        return navigate("/");
      } catch (error) {
        console.log({message: error.message});
      }
    }

    postTransaction();

  }

  function handleChange(e) {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    })
  }

  function handleClear() {
    setTransaction({
      description: '',
      amount: 0,
      type: 'credit',
      date: ''
    });
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>

        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select id="type" name="type" value={transaction.type} onChange={handleChange}>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" value={transaction.amount} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={transaction.description} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={transaction.date} onChange={handleChange}/>
        </div>

        <button type="submit">Submit</button>
        
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
    </div>
  )
}
export default Form;

import { useState } from "react";
import { createTransaction } from "../api";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Form () {

  const [state, setState] = useState({
    loading: false,
    transaction: {
      description: '',
      amount: 0,
      type: 'credit',
      date: ''
    },
    error: false
  });

  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    async function postTransaction() {
      setState({ ...state, loading: true })
      try {
        const res = await createTransaction(transaction);
        console.log({res})
        if (res.status === 400){
          const json = await res.json();
          setState({ ...state, loading: false, error: json?.errors })
          return;
        }
        return navigate("/");
      } catch (error) {
        const { message } = error;
        console.log({message: error.message});
        setState({ ...state, loading: false, error: { message } })
      }
    }

    postTransaction();

  }

  function handleChange(e) {
    let value = e.target.value;
    const updatedTransaction = { ...transaction, [e.target.name]: e.target.value};
    setState({
      ...state,
      transaction: updatedTransaction
    });
  }

  function handleClear() {
    const updatedTransaction = {
      description: '',
      amount: 0,
      type: 'credit',
      date: ''
    };
    setState({
      ...state,
      transaction: updatedTransaction
    });

  }

  const { loading, transaction, error } = state;

  const errorsMap = error.length ? (
    error.map((error) => (
      <p key={uuidv4()}>{error.msg}</p>
    ))
  ): null;

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {errorsMap}
        {error.message ? <p>Server is down. Please try after some time!</p> : null}
        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select id="type" name="type" value={transaction.type} onChange={handleChange}>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" value={transaction.amount} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={transaction.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={transaction.date} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
        
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
    </div>
  )
}
export default Form;

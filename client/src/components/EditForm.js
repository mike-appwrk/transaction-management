import { useState, useEffect } from "react";
import { getTransaction, updateTransaction } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormatter } from "../lib/helpers";

function EditForm () {

  const { id } = useParams();

  const [state, setState] = useState({
    loading: true,
    transaction: {},
    error: false
  });

  useEffect(() => {
    async function fetchTransaction () {
      try {
        const res = await getTransaction(id);
        const transaction = await res.json();
        setState({ ...state, loading: false, transaction });
      } catch (error) {
        console.log({ message: error.message });
        setState({ ...state,  error: true })
      }
    }
    fetchTransaction();
  }, [])

  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    async function postTransactionUpdates() {
      try {
        const res = await updateTransaction (id, state.transaction);
        const updatedTransaction = await res.json();
        console.log({ updatedTransaction });
        navigate(`/transaction/${id}`);
      } catch (error) {
        console.log({ message: error.message });
      }
    }

    postTransactionUpdates();

  }

  function handleChange(e) {
    const transaction = {...state.transaction, [e.target.name]: e.target.value}
    setState({
      ...state,
      transaction
    })
  }

  function handleClear() {
    const transaction = {
      description: '',
      amount: 0,
      type: 'credit',
      date: ''
    }
    setState({
      ...state,
      transaction
    })
  }

  const { loading, transaction, error } = state;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
            <input type="date" id="date" name="date" value={dateFormatter(transaction.date, 'YYYY-MM-DD')} onChange={handleChange}/>
          </div>

          <button type="submit">Submit</button>
          
          <button type="button" onClick={handleClear}>Clear</button>
        </form>
      )
    }
    </div>
  )
}

export default EditForm;

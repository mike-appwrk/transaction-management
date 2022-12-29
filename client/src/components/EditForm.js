import { useState, useEffect } from "react";
import { getTransaction, updateTransaction } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormatter } from "../lib/helpers";
import { v4 as uuidv4 } from "uuid";

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
        console.log({res});
        if (res.status === 400){
          const json = await res.json();
          setState({ ...state, loading: false, error: json?.errors })
          return;
        }
        const updatedTransaction = await res.json();
        navigate(`/transaction/${id}`);
      } catch (error) {
        const { message } = error;
        console.log({message: error.message});
        setState({ ...state, loading: false, error: { message } })
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

  const errorsMap = error.length ? (
    error.map((error) => (
      <p key={uuidv4()}>{error.msg}</p>
    ))
  ): null;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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

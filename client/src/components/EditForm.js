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
    setState({...state, loading: true })
    async function fetchTransaction () {
      try {
        const res = await getTransaction(id);
        const transaction = await res.json();
        setState({ ...state, loading: false, transaction });
      } catch (error) {
        console.log({ message: error.message });
        setState({ ...state,  error: true, loading: false })
      }
    }
    fetchTransaction();
    // eslint-disable-next-line
  }, [id])

  const navigate = useNavigate();

  function validateFormData() {
    let errors = [];
    const { transaction: { description, amount, type, date } } = state;
    if (!description) errors.push({ msg: 'Please enter a descrption' });
    if (!amount) errors.push({ msg: 'Please enter an amount greater than 0' });
    if (typeof amount !== 'number' ) errors.push({ msg: 'Amount should be a number!' });
    if (! ['credit', 'debit'].includes(type) ) errors.push({ msg: 'Please select a valid type!' });
    if (!date) errors.push({ msg: 'Please select a date!' });
    
    if (errors.length) return errors;
    return false;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const validationErrors = validateFormData();
    if (validationErrors.length) {
      setState({
        ...state,
        error: validationErrors
      });
      return;
    }


    async function postTransactionUpdates() {
      setState({ ...state, loading: true });
      try {
        const res = await updateTransaction (id, state.transaction);
        console.log({res});
        if (res.status === 400){
          const json = await res.json();
          setState({ ...state, loading: false, error: json?.errors })
          return;
        }
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
    let value = e.target.value;
    if (e.target.type === 'number') value = parseInt(value);
    const transaction = {...state.transaction, [e.target.name]: value}
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
        {loading ? 'Loading...' : null}
      </form>
    </div>
  )
}

export default EditForm;

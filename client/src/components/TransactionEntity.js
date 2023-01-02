import { useState } from "react";
import { dateFormatter } from "../lib/helpers";
import EditField from "./EditField";
import { updateTransaction } from "../api";
function TransactionEntity({ transaction, id, index, updateModalContent, updateTransactionsWithBalance }) {

  const [details, setDetails] = useState(transaction);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  
  function validateFormData() {
    let errors = [];
    const { description, amount, date } = details;
    if (!description) errors.push('description');
    if (amount < 1) errors.push('amount');
    if (!amount) errors.push('amount');
    if (!date) errors.push('date');
    return errors;
  }

  function handleChange (e) {
    let value = e.target.value;
    if (e.target.type === 'number') value = parseInt(value);
    setDetails({ ...details, [e.target.name]: value })
  }

  function handleEditClick () {
    setEditing(true);
  }

  async function postTransactionUpdates() {
    setLoading(true);
    try {
      const res = await updateTransaction (id, details);
      console.log({res});
      if (res.status === 400){
        const json = await res.json();
        console.log(json);
        setLoading(false);
        return;
      }
      const newDetails = await res.json();
      setDetails(newDetails);
      updateTransactionsWithBalance(newDetails);
      setEditing(false);
      setLoading(false);
      setErrors([]);
    } catch (error) {
      console.log({message: error.message});
      setLoading(false);
    }
  }

  function handleSaveClick() {
    const errors = validateFormData();
    if (errors.length) return setErrors(errors);
    postTransactionUpdates();
  }

  function handleCancelClick() {
    setEditing(false);
    setErrors([]);
    setDetails(transaction);

  }

  const color = index % 2 === 0 ? 'white' : 'primary-400';

  return (
    <tr id={id} key={`${id}-${index}`} className="odd:bg-white even:bg-primary-400">
      <td onClick={() => updateModalContent(id)} className="pr-16 pl-8 py-4 capitalize relative cursor-pointer">
        <span >{details?.description}</span>
         {editing ? <EditField type="text" color={color} error={errors.includes('description')} name="description" value={details?.description} onChange={handleChange}/> : null}
      </td>
      <td className="pr-16 pl-8 py-4 capitalize relative">
        <span>{dateFormatter(details?.date)}</span>
        {editing ? <EditField type="date" color={color} name="date" error={errors.includes('date')} value={dateFormatter(details?.date, 'YYYY-MM-DD')} onChange={handleChange}/> : null}
      </td>
      <td className="pr-16 pl-8 py-4 capitalize relative">
        <span>{transaction.type === 'credit' ? details.amount : '-'}</span>
        {details.type === 'credit' && editing ? <EditField type="number" name="amount" error={errors.includes('amount')} value={details.type === 'credit' ? details.amount : '-'} onChange={handleChange}/> : null}
      </td>
      <td className="pr-16 pl-8 py-4 capitalize relative">
        <span>{transaction.type === 'debit' ? details.amount : '-'}</span>
        {details.type === 'debit' && editing ? <EditField type="number" name="amount" error={errors.includes('amount')} value={details.type === 'debit' ? details.amount : '-' } onChange={handleChange}/> : null}
      </td>
      <td className="pr-16 pl-8 py-4 capitalize relative">
        {transaction.balance}
      </td>
      {!editing ? (
        <td className="py-4 w-48 capitalize">
          <button className="btn btn--primary" onClick={handleEditClick}>Edit</button>
        </td>
        
        ) : null
      }
      {editing ? (
        <td className="py-4 w-48 capitalize flex gap-2">
          <button className="btn btn--primary" disabled={loading} onClick={handleSaveClick}>Save</button>
          <button className="btn btn--primary" disabled={loading} onClick={handleCancelClick}>Cancel</button>
        </td>
        ) : null
      }
    </tr>
  )
}

export default TransactionEntity;

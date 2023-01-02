import { Link, NavLink } from "react-router-dom";
import TransactionsTableHeaders from "./TransactionsTableHeaders";
import TransactionEntity from "./TransactionEntity";
import Modal from "./Modal";
import { useState } from "react";
import { dateFormatter } from "../lib/helpers";
import close from "../icons/close.svg";


function TransactionsEditor ({ transactions, loading }) {

  let balance = 0;

  const [ modalContent, setModalContent ] = useState(null);

  function updateModalContent(id){
    if (!id)  return setModalContent(null);
    const transaction = transactionsWithBalance.find((transaction) =>  transaction._id === id)
    setModalContent(transaction);
  }

  const transactionsWithBalance = transactions.map((transaction) => {
    balance = transaction.type === 'credit' ? balance + transaction.amount : balance - transaction.amount;
    return {
      ...transaction,
      balance
    }
  });

  return (
    <div>
      <div className="text-black">
        <div  className="flex gap-4 items-center mb-10">
          <h2 className="font-bold text-xl">Transactions History</h2>
          <Link className="btn btn--primary" to="/create">Add New</Link>
        </div>
        
        {loading ? (
          <p> Loading... </p>
        ) : (
        <table className="rounded-md overflow-hidden mb-10">
          <TransactionsTableHeaders />
          <tbody>
          {transactionsWithBalance.map((transaction, index) => {
            const id = transaction['_id'];

            return (
              <TransactionEntity id={id} index={index} key={`${id}-${index}`} transaction={transaction} updateModalContent={updateModalContent}/>
            )
          })}
          </tbody>
        </table>
    )}
    
      </div>

    {
      modalContent ? (
        <Modal>
          <div className="fixed bg-white bottom-0 left-0 w-full px-10 py-4 shadow-2xl flex gap-8 items-center">
            <div className="flex gap-2">
              <span className="font-bold">Description: </span>
              <span className="capitalize">{modalContent.description}</span>
            </div>
            <div>
              <span className="font-bold">Transacted on: </span>
              <span>{dateFormatter(modalContent.date)}</span>
            </div>
            <div>
              <span className="font-bold">Type: </span>
              <span className="capitalize">{modalContent.type}</span>
            </div>
            <div>
              <span className="font-bold">Amount: </span>
              <span className="capitalize">{modalContent.amount}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Link to={`/transaction/${modalContent._id}`} className="btn btn--primary">View</Link> 
              <Link to={`/edit/${modalContent._id}`} className="btn btn--primary">Edit</Link>
              <button onClick={() => updateModalContent(null)} className="btn btn--secondary">
                <img src={close} alt="close-icon" />
              </button>
            </div>
          </div>
        </Modal>
      ) : null
    }
    </div>
      
  )
}

export default TransactionsEditor;

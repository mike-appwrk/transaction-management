import { Link } from "react-router-dom";
import TransactionsTableHeaders from "./TransactionsTableHeaders";
import TransactionEntity from "./TransactionEntity";


function TransactionsEditor ({ transactions, loading }) {

  let balance = 0;

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
              <TransactionEntity id={id} index={index} key={`${id}-${index}`} transaction={transaction} />
            )
          })}
          </tbody>
        </table>
    )}
    
    </div>
    </div>
      
  )
}

export default TransactionsEditor;

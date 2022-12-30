import { Link, useNavigate } from "react-router-dom";
import TransactionsTableHeaders from "./TransactionsTableHeaders";
import { dateFormatter } from "../lib/helpers";


function Transactions ({ transactions }) {

  const navigate = useNavigate();

  let balance = 0;

  const transactionsWithBalance = transactions.map((transaction) => {
    balance = transaction.type === 'credit' ? balance + transaction.amount : balance - transaction.amount;
    return {
      ...transaction,
      balance
    }
  }).reverse();


  return (
    <div className="text-black">
      <div  className="flex gap-4 items-center mb-10">
        <h2 className="font-bold text-xl">Transactions History</h2>
        <Link className="btn btn--primary" to="/create">Add New</Link>
      </div>
      <table className="rounded-md overflow-hidden">
        <TransactionsTableHeaders />
        <tbody>
        {transactionsWithBalance.map((transaction, index) => {
          const id = transaction['_id'];
          const formattedDate = dateFormatter(transaction?.date);

          return (
            <tr id={id} key={id} className="odd:bg-white even:bg-primary-400 cursor-pointer" onClick={() => navigate(`/transaction/${id}`)}>
              <td className="pr-16 pl-8 py-4 capitalize">{transaction?.description}</td>
              <td className="pr-16 pl-8 py-4 capitalize">{formattedDate}</td>
              <td className="pr-16 pl-8 py-4 capitalize">{transaction.type === 'credit' ? transaction.amount : '-'}</td>
              <td className="pr-16 pl-8 py-4 capitalize">{transaction.type === 'debit' ? transaction.amount : '-'}</td>
              <td className="pr-16 pl-8 py-4 capitalize">{transaction.balance}</td>
              <td className="pr-16 pl-8 py-4 capitalize"><Link to={`/transaction/${id}`}>View</Link></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions;

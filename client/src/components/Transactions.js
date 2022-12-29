import { Link } from "react-router-dom";
import TransactionsTableHeaders from "./TransactionsTableHeaders";
import { dateFormatter } from "../lib/helpers";


function Transactions ({ transactions }) {

  let balance = 0;

  const transactionsWithBalance = transactions.map((transaction) => {
    balance = transaction.type === 'credit' ? balance + transaction.amount : balance - transaction.amount;
    return {
      ...transaction,
      balance
    }
  }).reverse();

  return (
    <div className="table-wrap">
      <table>
        <TransactionsTableHeaders />
        <tbody>
        {transactionsWithBalance.map((transaction) => {
          const id = transaction['_id'];
          const formattedDate = dateFormatter(transaction?.date);

          return (
            <tr id={id} key={id}>
              <td>{formattedDate}</td>
              <td>{transaction?.description}</td>
              <td>{transaction.type === 'credit' ? transaction.amount : '-'}</td>
              <td>{transaction.type === 'debit' ? transaction.amount : '-'}</td>
              <td>{transaction.balance}</td>
              <td><Link to={`/transaction/${id}`}>View</Link></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions;

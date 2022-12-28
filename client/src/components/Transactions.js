import TransactionsTableHeaders from "./TransactionsTableHeaders";
import moment from "moment";

function Transactions ({ transactions }) {

  let runningBalance = 0;

  return (
    <div className="table-wrap">
      <table>
        <TransactionsTableHeaders />
        <tbody>
        {transactions.map((transaction) => {
          runningBalance = transaction.type === 'credit' ? runningBalance + transaction.amount : runningBalance - transaction.amount;
          const formattedDate = moment(transaction?.date).format('MM/D/YYYY');

          return (
            <tr>
              <td>{formattedDate}</td>
              <td>{transaction?.description}</td>
              <td>{transaction.type === 'credit' ? transaction.amount : '-'}</td>
              <td>{transaction.type === 'debit' ? transaction.amount : '-'}</td>
              <td>{runningBalance}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions;

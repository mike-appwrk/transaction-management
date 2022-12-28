import TransactionsTableHeaders from "./TransactionsTableHeaders";
import moment from "moment";

function Transactions ({ transactions }) {

  let balance = 0;

  const transactionsWithBalance = transactions.map((transaction) => {
    balance = transaction.type === 'credit' ? balance + transaction.amount : balance - transaction.amount;
    return {
      ...transaction,
      balance
    }
  });

  return (
    <div className="table-wrap">
      <table>
        <TransactionsTableHeaders />
        <tbody>
        {transactionsWithBalance.reverse().map((transaction) => {
          const id = transaction['_id'];
          const formattedDate = moment(transaction?.date).format('MM/D/YYYY');

          return (
            <tr id={id}>
              <td>{formattedDate}</td>
              <td>{transaction?.description}</td>
              <td>{transaction.type === 'credit' ? transaction.amount : '-'}</td>
              <td>{transaction.type === 'debit' ? transaction.amount : '-'}</td>
              <td>{transaction.balance}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions;

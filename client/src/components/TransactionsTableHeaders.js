import { Link } from "react-router-dom";

function TransactionsTableHeaders () {
  return (
    <thead>
      <tr>
        <th>Office Transactions</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>
          <Link to="/create">
            <span>+ Add Transaction</span>
          </Link>
        </th>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Credit</th>
        <th>Debit</th>
        <th>Running </th>
      </tr> 
    </thead>
  )
}

export default TransactionsTableHeaders;

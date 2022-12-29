import { useParams, Link } from "react-router-dom";
import TransactionDetails from "../components/TransactionDetails";

function TransactionPage() {

  const { id } = useParams();

  return (
    <div>
      <TransactionDetails id={id} />
      <div>
        <Link to={`/edit/${id}`}>Edit</Link>
      </div>
    </div>
  )
}

export default TransactionPage;

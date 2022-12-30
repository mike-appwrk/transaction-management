import { useEffect, useState } from "react";
import { getTransaction } from "../api";
import { dateFormatter } from "../lib/helpers";

function TransactionDetails({ id }) {

  const [state, setState] = useState({
    loading: true,
    transaction: {},
    error: false
  });

  useEffect(() => {
    async function fetchTransaction () {
      try {
        const res = await getTransaction(id);
        const transaction = await res.json();
        setState({ ...state, loading: false, transaction });
      } catch (error) {
        console.log({ message: error.message });
        setState({ ...state,  error: true })
      }
    }

    fetchTransaction();
  }, [])

  const { loading, transaction, error } = state;

  if (error) {
    return <p>Unable to fetch!</p>
  }

  return (
    <div>
      {state.loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h2 className="mb-1">
            <span>{transaction?.description}</span>
            </h2>
          <p className="mb-1">
              <span>Transacted: </span>
              <span>{transaction?.date ? dateFormatter(transaction.date) : null}</span>
          </p>
          <p className="mb-1">
            <span className="capitalize">{transaction?.type} Amount: </span>
            <span>{transaction?.amount}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default TransactionDetails;

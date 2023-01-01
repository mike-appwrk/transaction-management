import { useEffect, useState } from "react";
import { getTransactions } from "../api";
import Transactions from "../components/Transactions";

function HomePage () {

  const [ state, setState ] = useState({
    transactions: [],
    offset: 0,
    loading: false,
    error: false,
    allResultsLoaded: false
  });
 
  const limit = 5;

  async function fetchTransactions () {
    try {
      const newTransactions = await getTransactions( state.offset, limit );
      if (!newTransactions.length ) return setState({ ...state, allResultsLoaded: true })
      setState({
        ...state,
        transactions: [...transactions, ...newTransactions],
        offset: state.offset + limit,
        loading: false,
        error: false
      })
    } catch (error) {
      setState({ ...state, loading: false, error: error })
      console.log({message: error.message});
    }
  }

  useEffect(() => {
    setState({ ...state, loading: true })
    fetchTransactions();
  }, []);

  function loadMore() {
    fetchTransactions();
  }

  const { transactions, allResultsLoaded } = state;

  return (
    <div>
      <Transactions transactions={transactions} loading={state.loading}/>
      {state.loading ? null : (
        <div>
          <button onClick={loadMore} className="btn btn--primary disabled:opacity-50" disabled={allResultsLoaded ? true : false}>Load More</button>
        </div>
      )}
    </div>
  )
}

export default HomePage;

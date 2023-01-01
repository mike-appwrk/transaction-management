import { useEffect, useState, useRef } from "react";
import { getTransactions } from "../api";
import TransactionsEditor from "../components/TransactionsEditor";
import useElementOnScreen from "../lib/useElementOnScreen";

function Dashboard () {

  const [ state, setState ] = useState({
    transactions: [],
    offset: 0,
    loading: false,
    error: false,
    allResultsLoaded: false
  });

  const [ ref, visible ] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  });

  useEffect(() => {
    if (visible) {
      fetchTransactions();
    }
  }, [visible])
 
  const limit = 8;

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

  function loadMore() {
    fetchTransactions();
  }

  const { transactions, allResultsLoaded } = state;

  return (
    <div>
      <TransactionsEditor transactions={state.transactions} loading={state.loading}/>
      {state.loading || state.allResultsLoaded ? null : (
        <div>
          <button ref={ref} onClick={loadMore} className="btn btn--primary invisible opacity-0" disabled={allResultsLoaded ? true : false}>Load More</button>
        </div>
      )}
    </div>
  )
}

export default Dashboard;

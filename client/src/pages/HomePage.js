import { useEffect, useState } from "react";
import { getTransactions } from "../api";
import Transactions from "../components/Transactions";

function HomePage () {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    
    async function fetchTransactions () {
      try {
        const transactions = await getTransactions();
        setTransactions(transactions);
      } catch (error) {
        console.log({message: error.message});
      }
    }

    fetchTransactions();
    
  }, []);

  return (
    <div>
      <Transactions transactions={transactions}/>
    </div>
  )
}

export default HomePage;

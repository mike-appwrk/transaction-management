import { useEffect, useState } from "react";
import Transactions from "../components/Transactions";

function HomePage () {

  return (
    <div>
      <h2>Home Page</h2>
      <Transactions />
    </div>
  )
}

export default HomePage;

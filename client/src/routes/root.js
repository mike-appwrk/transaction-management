import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Root() {

  useEffect(() => {
    document.title = 'Transaction Management System';
  }, []);

  return (
    <div>
      <h1>Transaction Management</h1>
      <div className="main">
        <Outlet />
      </div>
    </div> 
    
  );
}
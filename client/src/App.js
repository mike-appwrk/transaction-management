import { useEffect } from "react";

function App () {
  useEffect(() => {
    document.title = 'Transaction Management System';
  }, []);

  return (
    <div>
      Hi Server!
    </div>
  )
}

export default App;

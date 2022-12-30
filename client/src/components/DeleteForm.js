import { useNavigate } from "react-router-dom";
import { deleteTransaction } from "../api";

function DeleteForm ({ id }) {

  const navigate = useNavigate();

  async function handleDelete (e) {
    e.preventDefault();
    console.log('Deleting!');
    try {
      const res = await deleteTransaction(id);
      navigate(`/`);
    } catch (error) {
      console.log({ message: error.message })
    }
  }

  function handleReturnClick () {
    navigate(`/transaction/${id}`);
  }

  return (
    <form onSubmit={handleDelete}>
      <div className="flex gap-2  mt-4">
        <button type="submit" className="btn btn--primary">Confirm</button>
        <button onClick={handleReturnClick} type="button" className="btn btn--secondary">Go Back</button>
      </div>
    </form>
  )
}

export default DeleteForm;

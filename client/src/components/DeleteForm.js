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
      <button type="submit">Delete</button>
      <button onClick={handleReturnClick} type="button">Go Back</button>
    </form>
  )
}

export default DeleteForm;

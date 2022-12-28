const url = "http://localhost:7777/api";


export const getTransactions = () => fetch(url).then(res => res.json()).catch(console.log);

export const createTransaction = (transaction) => fetch(`${url}/create`, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(transaction),
});

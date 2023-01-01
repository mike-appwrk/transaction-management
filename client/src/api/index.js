const url = "http://localhost:7777/api";


export const getTransactions = (offset = 0, limit = null) => fetch(`${url}/transactions?offset=${offset}&limit=${limit}`).then(res => res.json()).catch((error) => error);

export const getTransaction = (id) => fetch(`${url}/transaction/${id}`);

export const createTransaction = (transaction) => fetch(`${url}/create`, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(transaction),
});

export const updateTransaction = (id, transaction) => fetch(`${url}/edit/${id}`, {
  method: 'PATCH', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(transaction),
});

export const deleteTransaction = (id) => fetch(`${url}/delete/${id}`,  { method: 'DELETE' });

const url = "http://localhost:7777/api";


export const getTransactions = () => fetch(url).then(res => res.json()).catch(console.log);
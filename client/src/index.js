import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './pages/ErrorPage';
import "./index.css";
import TransactionPage from './pages/TransactionPage';
import EditPage from './pages/EditPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/transaction/:id",
        element: <TransactionPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

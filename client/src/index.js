import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Dashboard from './pages/Dashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './pages/ErrorPage';
import "./index.css";
import TransactionPage from './pages/TransactionPage';
import EditPage from './pages/EditPage';
import DeletePage from './pages/DeletePage';

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
        path: "/dashboard",
        element: <Dashboard />
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
      {
        path: "/delete/:id",
        element: <DeletePage />,
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

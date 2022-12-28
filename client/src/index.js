import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './pages/ErrorPage';


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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

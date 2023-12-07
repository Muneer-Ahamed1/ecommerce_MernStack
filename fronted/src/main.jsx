import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import ErrorPage from './ErrorPage.jsx'
import FilterTwo from "./features/product-list/components/productList.jsx"
import ProductOverview from "./features/product-list/components/productDetail.jsx"

import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path:"/productList",
        element:<FilterTwo/>
      },
      {
        path:"/details/:id",
        element:<ProductOverview/>
      }
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)

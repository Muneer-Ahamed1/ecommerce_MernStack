import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import ErrorPage from './ErrorPage.jsx'
import FilterTwo from "./pages/ProductList.jsx"
import ProductOverview from "./features/product-list/components/productDetail.jsx"
import Cart from "./features/cart/Cart.jsx"
import Checkout from './pages/CheckOut.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './store.js'
import SignUp from './features/auth/components/SignUp.jsx'
import Login from './features/auth/components/Login.jsx'
import Protected from "./features/auth/components/Protected.jsx"
import OrderSuccessPage from './pages/OrderSuccess.jsx'
import UserOrders from './pages/UserOrders.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/productList",
        element: (
          <Protected>
            <FilterTwo />
          </Protected>
        )
      },
      {
        path: "/detail/:id",
        element: (
          <Protected>
            <ProductOverview />
          </Protected>

        )
      },
      {
        path: "/cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        )

      },
      {
        path: "/checkout",
        element: (
          <Protected>
            <Checkout />

          </Protected>

        )
      },
      {
        path: "/SignUP",
        element: <SignUp />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "/order/:id",
        element: (<Protected>
          <OrderSuccessPage />
        </Protected>)
      },
      {
        path:"/Myorders",
        element:(
          <Protected>
            <UserOrders/>
          </Protected>
        )
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />

  </Provider>
)

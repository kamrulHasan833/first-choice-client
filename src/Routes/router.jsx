import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Cart from "../Pages/Cart";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";
import Products from "../Pages/Products";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/my-cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;

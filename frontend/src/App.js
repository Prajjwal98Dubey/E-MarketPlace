
import Body from "./components/Body";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SearchProducts from "./components/SearchProducts";
import ProductDisplay from "./components/ProductDisplay";
import CategoryProducts from "./components/CategoryProducts";
import Cart from "./components/Cart";
import SellerPage from "./components/SellerPage";
import { ToastContainer } from "react-toastify";
import BuyProduct from "./components/BuyProduct";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import Register from "./components/Register";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import PreviousOrders from "./components/PreviousOrders";


function App() {
     return (
          <>
               <RouterProvider router={appRouter} />
               <ToastContainer />
          </>
     );
}

const appRouter = createBrowserRouter([
     {
          path: '/',
          element: <Body />
     },
     {
          path: '/search',
          element: <SearchProducts />
     },
     {
          path: '/product',
          element: <ProductDisplay />
     },
     {
          path: '/category',
          element: <CategoryProducts />
     },
     {
          path: '/cart',
          element: <Cart />
     },
     {
          path: '/seller',
          element: <SellerPage />
     },
     {
          path: "/buy",
          element: <BuyProduct />
     },
     {
          path: '/register',
          element: <Register />
     },
     {
          path:'/login',
          element:<Login/>
     },
     {

          path: '/success-payment',
          element: <PaymentSuccess />
     },
     {
          path: 'failure-payment',
          element: <PaymentFailure />

     },
     {
          path:'/my-profile',
          element:<MyProfile/>
     },
     {
          path:'/order-history',
          element:<PreviousOrders/>
     }
])

export default App;

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import SellersCenter from './components/Topbar_components/SellersCenter';
import ProductDetail from "./components/ProductDetail";
import Cart from './components/Topbar_components/Cart';


let router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/seller",
    element: (
      <div>
        <SellersCenter />
      </div>
    ),
  },
  {
    path: "/cart",
    element: (
      <div>
        <Cart />
      </div>
    ),
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App

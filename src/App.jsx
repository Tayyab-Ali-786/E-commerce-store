import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import SellersCenter from './components/Topbar_components/SellersCenter';
import ProductDetail from "./components/ProductDetail";


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

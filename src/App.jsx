import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Productspage from "./Pages/ProductsPage/Productspage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import Checkout from "./Pages/Checkout/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Cart } from "./CartItems/Cart";
import { Toaster } from "react-hot-toast";

// Layout component to conditionally show Navbar and Footer
function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Navbar />}

      {/* Main content area that grows to fill space */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Productspage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-info/:id"
            element={
              <ProtectedRoute>
                <ProductInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
      <Cart />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout />
          <Toaster position="top-right" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

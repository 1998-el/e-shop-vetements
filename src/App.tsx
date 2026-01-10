
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import GlobalSpinner from './components/GlobalSpinner';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import PaymentCancel from './pages/PaymentCancel';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ProductDetail from './pages/ProductDetail';
import CartTest from './pages/CartTest';
import DeliveryManagement from './pages/DeliveryManagement';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart-test" element={<CartTest />} />
      <Route path="/deliveries" element={<DeliveryManagement />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
}

function AppWithSpinner() {
  const { isGlobalLoading } = useLoading();

  return (
    <>
      <AppContent />
      <GlobalSpinner show={isGlobalLoading()} />
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <CartProvider>
        <AppWithSpinner />
      </CartProvider>
    </LoadingProvider>
  );
}

export default App

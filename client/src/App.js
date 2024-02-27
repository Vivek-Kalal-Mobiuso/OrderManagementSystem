import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HomePage } from './components'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication, Checkout, MyCart, NavbarHeader, Sucess, Cancel } from './pages';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <NavbarHeader />

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/mycart' element={<MyCart />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/sucess' element={<Sucess />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
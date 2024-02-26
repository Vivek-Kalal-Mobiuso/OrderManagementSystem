import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../css/navbar.css"
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../store/slice/UserSlice.js"

function NavbarComp() {
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState("/");
  const navigate = useNavigate()
  const { user, cart } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    setUrl(location.pathname)
  }, [location, user])
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className='logo'><span>OMS</span></Navbar.Brand>
          <Nav className="me-auto nav-custom">
            <Link className={`nav-links ${url === '/' ? "active" : ""}`} to="/">Home</Link>
            <Link className={`nav-links ${url === '/about' ? "active" : ""}`} to="/about">About</Link>
            <div className='cart-div'>
              <Link className={`nav-links ${url === '/mycart' ? "active" : ""}`} to="/mycart">
                My Cart
              </Link>
              <span style={{ color: "white" }} className='bg-primary rounded-5 px-1'>{cart.length}</span>

            </div>
          </Nav>
          <Button onClick={() => {
            if (user) {
              console.log("hi")
              dispatch(logoutUser());
            } else {
              navigate("/auth")
            }
          }}>{user ? user.customerUsername : "Login/Signup"}</Button>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
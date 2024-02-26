import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../css/navbar.css"
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../store/slice/UserSlice.js"
import { toast } from 'react-toastify';

function NavbarHeader() {
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState("/");
  const navigate = useNavigate()
  const { user, cart } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    setUrl(location.pathname)
  }, [location, user])


  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand className='logo'><span>OMS</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-bg" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-new">
            <Link className={`nav-links ${url === '/' ? "active" : ""}`} to="/">Home</Link>
            <div className='cart-div'>
              <Link className={`nav-links ${url === '/mycart' ? "active" : ""}`} to="/mycart">
                My Cart
              </Link>
              <span style={{ color: "white" }} className='bg-primary rounded-5 px-1'>{cart.length}</span>

            </div>
          </Nav>

          <div className='text-center mt-sm-4 mt-lg-0 mt-4 mr-4'>
            <Button onClick={() => {
              if (user) {
                console.log("hi")
                dispatch(logoutUser());
                toast.success("Logged out Successfully")
              } else {
                navigate("/auth")
              }
            }}
              variant={`${(user) ? "danger" : "success"}`}
              className='text-center'
            >{user ? "Logout" : "Login/Signup"}</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
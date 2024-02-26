import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import "../css/authpage.css"
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerCustomer, loginCustomer } from '../api/customersApis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../store/slice/UserSlice.js"

function Authentication() {
    // States
    const [isSignup, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            customerEmail: '',
        },
        onSubmit: async (values) => {
            try {
                if (isSignup) {
                    let res = registerCustomer(values);
                    toast.promise(
                        res,
                        {
                            pending: 'Creating User',
                            success: 'User Created Succesfully!',
                            error: 'Something Went Wrong :(!',
                        }
                    );

                    res.then((result) => {
                        console.log(result);
                        // dispatch(setUser())
                        navigate(-1)
                    }).catch((e) => {
                        navigate("/auth")
                    })
                } else {
                    let res = loginCustomer(values);
                    toast.promise(
                        res,
                        {
                            pending: 'Logging User',
                            success: 'User Logged In Successfully!',
                            error: 'Invalid Credentials',
                        }
                    );
                    res.then((data) => {
                        console.log("hi");
                        dispatch(setUser(data))
                        navigate(-1)
                    }).catch((e) => {
                        navigate("/auth")
                    })
                }
            } catch (error) {
                toast.error("Something Went Wrong")
                console.log(error);
            }
        },
    });

    return (
        <>
            <h1 className='text-center mt-2'>Login/SignUp</h1>
            <Container className='mt-4 col-md-8 col-lg-6 col-10 border p-4 rounded-4 border-2 border-dark'>
                <Form className='auth-container' onSubmit={formik.handleSubmit}>
                    {isSignup && (
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicFName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='customerFirstName'
                                    onChange={formik.handleChange}
                                    value={formik.values.customerFirstName}
                                    placeholder="Enter FirstName"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="customerLastName"
                                    onChange={formik.handleChange}
                                    value={formik.values.customerLastName}
                                    placeholder="Enter LastName"
                                />
                            </Form.Group>
                        </div>

                    )
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="customerEmail"
                            onChange={formik.handleChange}
                            value={formik.values.customerEmail}
                            placeholder="Enter email"
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="customerPassword"
                            onChange={formik.handleChange}
                            value={formik.values.customerPassword}
                            required
                            placeholder="Enter Password"

                        />
                    </Form.Group>
                    {isSignup && (
                        <div>
                            <Form.Group className="mb-3" controlId="customerPhone">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="customerPhone"
                                    onChange={formik.handleChange}
                                    value={formik.values.customerPhone}
                                    placeholder="Enter Number"

                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="AddressLine1">
                                <Form.Label>Address Line-1*</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    name="addressLine1"
                                    onChange={formik.handleChange}
                                    value={formik.values.addressLine1}
                                    required
                                    placeholder="Enter Address"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="AddressLine2">
                                <Form.Label>Address Line-2</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    name="addressLine2"
                                    onChange={formik.handleChange}
                                    value={formik.values.addressLine2}
                                    placeholder="Enter Address"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="City">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                    placeholder="Enter City"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="State">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    onChange={formik.handleChange}
                                    value={formik.values.state}
                                    placeholder="Enter State"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="pincode">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="pincode"
                                    onChange={formik.handleChange}
                                    value={formik.values.pincode}
                                    placeholder="Enter Pincode"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    onChange={formik.handleChange}
                                    value={formik.values.country}
                                    placeholder="Enter Country"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="customerUserName"
                                    onChange={formik.handleChange}
                                    value={formik.values.customerUserName}
                                    required
                                    placeholder="Enter Username"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="customerGender"
                                        id="male"
                                        onChange={formik.handleChange}
                                        value="M"
                                    />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="customerGender"
                                        id="female"
                                        onChange={formik.handleChange}
                                        value="F"
                                    />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Female
                                    </label>
                                </div>
                            </Form.Group>
                        </div>
                    )
                    }
                    <div className='d-flex justify-content-center btn-container'>
                        <Button variant="primary" className='sub-button' type="submit"
                        // onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <button
                            type='button'
                            className='acc-btn'
                            onClick={() => {
                                
                                setIsSignUp((prev) => !prev)
                            }}
                        > {!isSignup ? "Don't have Account ?" : "Already Have an Account"}
                        </button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default Authentication;
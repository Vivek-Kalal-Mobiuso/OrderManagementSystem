import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../css/profile.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import { updateCustomer } from '../api/customersApis';
import { setUser } from '../store/slice/UserSlice';

const Profile = () => {
  // States
  const { user, token } = useSelector((state) => state.users)
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();

  // useEffects
  useEffect(() => {
    if (!user) {
      toast.error("Please Login First")
      navigate("/auth")
    }
  }, [user])


  // Functions
  const formik = useFormik({
    initialValues: {
      customerEmail: user?.customerEmail,
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        let updatePromise = updateCustomer({ ...values, customerId: user.customerId }, token)

        toast.promise(updatePromise, {
          pending: 'Updating User',
          success: 'User updated Succesfully!',
          error: 'Something Went Wrong :(!',
        })

        updatePromise.then((updatedCustomer) => {
          console.log(updatedCustomer);
          dispatch(setUser({ user: updatedCustomer, token }))
        })
        // navigate("/")
        setIsEditable(false)
      } catch (error) {

      }
    },
  });


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <Form className='border border-2 border-black rounded border-opacity-50 mt-3 p-3'>
        <div className='flex '>
          <Row>
            <Col className='col-sm-6 col-12'>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name='customerFirstName'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.customerFirstName : formik.values.customerFirstName}
                  placeholder="Enter First Name"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name='customerLastName'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.customerLastName : formik.values.customerLastName}
                  placeholder="Enter Last Name"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='col-sm-6 col-12'>
              <Form.Group className="mb-3" controlId="formEmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name='customerEmail'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.customerEmail : formik.values.customerEmail}
                  placeholder="Enter Email"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCustomerPhone">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="number"
                  name='customerPhone'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.customerPhone : formik.values.customerPhone}
                  placeholder="Enter Contact Number"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='col-sm-6 col-12'>
              <Form.Group className="mb-3" controlId="formCustomerUsername">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  name='customerUserName'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.customerUsername : formik.values.customerUserName}
                  placeholder="Enter UserName"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
            <Col>
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
                    checked={user?.customerGender === "M"}
                    // checked={!isEditable && user?.customerGender === "M"}
                    disabled={!isEditable}
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
                    // checked={!isEditable && user?.customerGender === "F"}
                    checked={user?.customerGender === "F"}
                    disabled={!isEditable}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='col-sm-6 col-12'>
              <Form.Group className="mb-3" controlId="formAddressLine1">
                <Form.Label>AddressLine 1</Form.Label>
                <Form.Control
                  type="text"
                  name='AddressLine1'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.addressLine1 : formik.values.AddressLine1}
                  placeholder="Enter AddressLine 1"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formAddressLine1">
                <Form.Label>AddressLine 2</Form.Label>
                <Form.Control
                  type="text"
                  name='AddressLine2'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.addressLine2 : formik.values.AddressLine2}
                  placeholder="Enter AddressLine 2"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='col-sm-6 col-12'>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name='city'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.city : formik.values.city}
                  placeholder="Enter City"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name='state'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.state : formik.values.state}
                  placeholder="Enter AddressLine 2"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='col-sm-6 col-12'>
              <Form.Group className="mb-3" controlId="formPincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  name='pincode'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.pincode : formik.values.pincode}
                  placeholder="Enter Pincode"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name='country'
                  onChange={formik.handleChange}
                  value={!isEditable ? user?.country : formik.values.country}
                  placeholder="Enter Country"
                  disabled={!isEditable ? true : false}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className='w-full text-center'>
          {/* <Button variant={`${!isEditable ? "primary" : "success"}`} type={!isEditable ? "button" : "submit"}
            onClick={() => {
              if (!isEditable) {
                setIsEditable((prev) => !prev)
              }
            }}
            className='update-btn'
          >
            {!isEditable ? "Edit" : "Update"}
          </Button> */}
          <Button variant={`${!isEditable ? "primary" : "success"}`} type="button"
            onClick={() => {
              if (!isEditable) {
                setIsEditable((prev) => !prev)
              } else {
                formik.handleSubmit()
              }
            }}
            className='update-btn'
          >
            {!isEditable ? "Edit" : "Update"}
          </Button>
        </div>
      </Form>

    </motion.div>
  )
}

export default Profile
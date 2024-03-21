import * as customerService from "../service/customerServices.js";

export const newCustomerController = async (req, res) => {
    try {
        const customerDetails = req.body;

        const newCustomerDetails = await customerService.createNewCustomerService(customerDetails);

        return res.status(200).send({ message: newCustomerDetails.message, customer: newCustomerDetails.result, token: newCustomerDetails.token });
    } catch (error) {
        return res.status(error.status || 500).send({ error: error.message });
    }
}

export const getCustomerOrdersController = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        if (!customerId) return res.status(400).send({ message: "Please Provide CustomerID!" })

        const customerOrders = await customerService.getAllOrdersService(customerId);

        return res.status(200).send({ message: customerOrders.message, orders: customerOrders.result });
    } catch (error) {
        return res.status(error.status || 500).send({ error: error.message || "Internal Server Error" });
    }
}

export const getCustomerByIdController = async (req, res) => {
    try {
        const customerId = req.params.customerId
        if (!customerId) return res.status(400).send({ message: "Please Provide CustomerID!" })

        const customer = await customerService.getCustomerByIdService(customerId);

        return res.status(200).send({ message: customer.message, customer: customer.result })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" })
    }
}

export const getAllCustomersController = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomersService();

        return res.status(200).send({ message: "Customers found..", customers: customers.result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const deleteCustomerByIdController = async (req, res) => {
    try {
        const customerId = req.params.customerId
        if (!customerId) return res.status(400).send({ message: "Please Provide CustomerID!" })

        const deletedCustomer = await customerService.deleteCustomerByIdService(customerId)

        return res.status(200).send({ message: deletedCustomer.message })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" })
    }
}

export const updateCustomerController = async (req, res) => {
    try {
        const customerId = req.params.customerId
        if (!customerId) return res.status(400).send({ message: "Please Provide CustomerID!" })
        const customerDetails = req.body

        const updatedCustomer = await customerService.updateCustomerService(customerId, customerDetails)
        return res.status(200).send({ updatedCustomer })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" })
    }
}

export const loginCustomerController = async (req, res) => {
    try {
        const { customerEmail, customerPassword } = req.body

        if (!customerEmail || !customerPassword) return res.status(400).send({ message: "Incomplete Details..." })

        const customer = await customerService.loginCustomerService(customerEmail, customerPassword)

        return res.status(200).send({ message: customer.message, user: customer.newMappedResult, token: customer.token })
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" })
    }
}
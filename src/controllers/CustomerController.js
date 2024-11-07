import Customer from "../models/Customers.js"

const CustomerController = {
    create: async (req, res) => {
        try {
            const customer = new Customer({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                Image: req.body.Image,
                token: req.body.token,
            })
            const newCustomer = await customer.save()
            res.status(201).json(newCustomer)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getall: async (req, res) => {
        try {
            const customers = await Customer.find()
            res.json(customers)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    getOne: async (req, res) => {
        try {
            const token = req.params.token
            const customer = await Customer.findOne({ token: token })
            if (customer == null) {
                return res.status(404).json({ message: "Customer not found" })
            }
            res.json(customer)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    delete: async (req, res) => {
        try {
            const token = req.params.token
            const customer = await Customer.findOneAndDelete({ token: token })
            if (customer == null) {
                return res.status(404).json({ message: "Customer not found" })
            }
            await customer.delete()

            res.status(200).json({
                deletedCustomer: {
                    name: customer.name,
                    token: customer.token,
                    email: customer.email,
                },
                message: "Customer deleted",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    update: async (req, res) => {
        try {
            const token = req.params.token
            const updatedData = {
                name: req.body.name,
                cpf: req.body.cpf,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                token: req.body.token,
                Image: req.body.Image,
                services: req.body.services,
                especialities: req.body.especialities,
            }

            const updatedProfessional = await Customer.findOneAndUpdate(
                { token: token },
                updatedData,
                { new: true }
            )

            if (!updatedCustomer) {
                return res.status(404).json({ message: "Customer not found" })
            }

            res.status(200).json({
                updatedCustomer: {
                    name: updatedCustomer.name,
                    token: updatedCustomer.token,
                    cpf: updatedCustomer.cpf,
                },
                message: "Customer updated!",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
}

export default CustomerController

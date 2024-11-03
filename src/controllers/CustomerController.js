import Customer from "../models/Customers"

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
            const id = req.params.id
            const customer = await Customer.findById(id)
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
            const id = req.params.id
            const customer = await Customer.findById(id)
            if (customer == null) {
                return res.status(404).json({ message: "Customer not found" })
            }
            const deletedCustomer = await Customer.findByIdAndDelete(id)
            res.status(200).json({
                deletedCustomer,
                message: "Customer deleted",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    update: async (req, res) => {
        const id = req.params.id
        const customer = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            Image: req.body.Image,
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(id, customer)
        if (updatedCustomer == null) {
            return res.status(404).json({ message: "Customer not found" })
        }
        res.status(200).json({ service, message: "Customer updated" })
    },
}

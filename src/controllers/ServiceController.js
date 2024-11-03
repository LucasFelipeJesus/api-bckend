import Service from "../models/Services.js"

const ServiceController = {
    create: async (req, res) => {
        try {
            const service = new Service({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            })
            const newService = await service.save()
            res.status(201).json(newService)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getall: async (req, res) => {
        try {
            const services = await Service.find()
            res.json(services)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id
            const service = await Service.findById(id)
            if (service == null) {
                return res.status(404).json({ message: "Service not found" })
            }
            res.json(service)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const service = await Service.findById(id)
            if (service == null) {
                return res.status(404).json({ message: "Service not found" })
            }
            const deletedService = await Service.findByIdAndDelete(id)
            res.status(200).json({ deletedService, message: "Service deleted" })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    update: async (req, res) => {
        const id = req.params.id
        const service = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        }

        const updatedService = await Service.findByIdAndUpdate(id, service)
        if (updatedService == null) {
            return res.status(404).json({ message: "Service not found" })
        }
        res.status(200).json({ service, message: "Service updated" })
    },
}

export default ServiceController

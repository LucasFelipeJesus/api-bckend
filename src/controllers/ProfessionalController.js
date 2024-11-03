import Professional from "../models/Professionals.js"

const ProfessionalController = {
    create: async (req, res) => {
        try {
            const professional = new Professional({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                services: req.body.services,
                Image: req.file ? req.file.path : null,
            })
            const newProfessional = await professional.save()
            res.status(201).json(newProfessional)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getall: async (req, res) => {
        try {
            const professionals = await Professional.find()
            res.json(professionals)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id
            const professional = await Professional.findById(id)
            if (professional == null) {
                return res
                    .status(404)
                    .json({ message: "Professional not found" })
            }
            res.json(professional)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const professional = await Professional.findById(id)
            if (professional == null) {
                return res
                    .status(404)
                    .json({ message: "Professional not found" })
            }
            const deletedProfessional = await Professional.findByIdAndDelete(id)
            res.status(200).json({
                deletedProfessional,
                message: "Professional deleted",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    update: async (req, res) => {
        const id = req.params.id
        const professional = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            Image: req.file ? req.file.path : null,
            services: req.body.services,
        }

        const updatedProfessional = await Professional.findByIdAndUpdate(
            id,
            professional
        )
        if (updatedProfessional == null) {
            return res.status(404).json({ message: "Professional not found" })
        }
        res.status(200).json({ professional, message: "Professional updated" })
    },
}

export default ProfessionalController

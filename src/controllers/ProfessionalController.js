import Professional from "../models/Professionals.js"
import Service from "../models/Services.js"

const ProfessionalController = {
    create: async (req, res) => {
        try {
            const servicesNames = req.body.services.map(
                (service) => service.name
            )

            const services = await Service.find({
                name: { $in: servicesNames },
            })

            const serviceIds = services.map((service) => service._id)

            const professional = new Professional({
                name: req.body.name,
                cpf: req.body.cpf,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                token: req.body.token,
                city: req.body.city,
                state: req.body.state,
                Image: req.body.Image,
                services: serviceIds,
            })
            const newProfessional = await professional.save()
            res.status(201).json(newProfessional)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getall: async (req, res) => {
        try {
            const professionals = await Professional.find().populate("services")
            res.json(professionals)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id
            const professional = await Professional.findById(id).populate(
                "services"
            )
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
            cpf: req.body.cpf,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            token: req.body.token,
            Image: req.body.Image,
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

    addRating: async (req, res) => {
        try {
            const { id } = req.params
            const { newRating } = req.body

            // Valida a nova pontuação
            if (
                typeof newRating !== "number" ||
                newRating < 1 ||
                newRating > 5
            ) {
                return res.status(400).json({
                    message: "Pontuação inválida. Use um valor entre 1 e 5.",
                })
            }
            const professional = await Professional.findById(id)
            if (professional == null) {
                return res
                    .status(404)
                    .json({ message: "Professional not found" })
            }
            professional.ratings.push(rating)
            const sum = professional.ratings.reduce((a, b) => a + b, 0)
            professional.averageRating = sum / professional.ratings.length
            await professional.save()
            res.status(200).json({
                professional,
                message: "Avaliação adicionada com sucesso",
                averageRating: professional.averageRating,
                ratings: professional.ratings,
            })
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao adicionar avaliação",
                error: err.message,
            })
        }
    },
}

export default ProfessionalController

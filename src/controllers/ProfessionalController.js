import Professional from "../models/Professionals.js"
import Service from "../models/Services.js"

const ProfessionalController = {
    create: async (req, res) => {
        try {
            // Verificando se 'services' é um array e se cada item tem o campo 'name'
            if (!Array.isArray(req.body.services)) {
                return res
                    .status(400)
                    .json({ message: "'services' should be an array" })
            }

            const servicesNames = req.body.services.map((service) => {
                if (!service.name) {
                    throw new Error(
                        "Each service should have a 'name' property"
                    )
                }
                return service.name
            })

            // Buscando os serviços no banco de dados
            const services = await Service.find({
                name: { $in: servicesNames },
            })

            // Verificando se algum serviço não foi encontrado
            if (services.length !== servicesNames.length) {
                return res
                    .status(404)
                    .json({ message: "Some services not found" })
            }

            // Pegando os IDs dos serviços encontrados
            const serviceIds = services.map((service) => service._id)

            // Criando o novo profissional
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
                especialities: req.body.especialities,
            })

            // Salvando o profissional no banco
            const newProfessional = await professional.save()

            // Respondendo com o novo profissional criado
            res.status(201).json(newProfessional)
        } catch (err) {
            console.error(err) // Exibe detalhes do erro no console para depuração
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
            const token = req.params.token // Pegando o token da URL
            const professional = await Professional.findOne({
                token: token,
            }).populate("services")

            if (professional == null) {
                return res
                    .status(404)
                    .json({ message: "Professional not found" })
            }

            return res.json(professional)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    delete: async (req, res) => {
        try {
            const token = req.params.token
            const professional = await Professional.findOne({ token: token })

            if (!professional) {
                return res
                    .status(404)
                    .json({ message: "Professional not found" })
            }

            await professional.deleteOne() // Exclui o documento encontrado

            res.status(200).json({
                deletedProfessional: {
                    name: professional.name,
                    token: professional.token,
                    cpf: professional.cpf,
                },
                message: "Professional deleted",
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

            const updatedProfessional = await Professional.findOneAndUpdate(
                { token: token },
                updatedData,
                { new: true }
            )

            if (!updatedProfessional) {
                return res
                    .status(404)
                    .json({ message: "Professional not found" })
            }

            res.status(200).json({
                updatedProfessional: {
                    name: updatedProfessional.name,
                    cpf: updatedProfessional.cpf,
                    token: updatedProfessional.token,
                },
                message: "Professional updated",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    addRating: async (req, res) => {
        try {
            const { token } = req.params
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
            const professional = await Professional.findOne({ token: token })
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

import mongoose from "mongoose"

const professionalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        cpf: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        cep: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        bairro: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        Image: {
            type: String,
            required: false,
        },
        token: {
            type: String,
            required: false,
        },
        especialities: {
            type: String,
            required: false,
        },
        ratings: [
            {
                type: Number,
                required: false,
                min: 1,
                max: 5,
            },
        ],
        averageRating: {
            type: Number,
            required: false,
            default: 0,
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
                required: false,
            },
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
                required: false,
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Professional = mongoose.model("Professional", professionalSchema)

export default Professional

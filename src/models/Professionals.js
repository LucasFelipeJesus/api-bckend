import mongoose from "mongoose"

const professionalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cpf: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        Image: {
            type: String,
            required: false,
        },
        token: {
            type: String,
            required: true,
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

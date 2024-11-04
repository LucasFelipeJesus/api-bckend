import mongoose from "mongoose"

const professionalSchema = new mongoose.Schema(
    {
        name: {
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
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
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

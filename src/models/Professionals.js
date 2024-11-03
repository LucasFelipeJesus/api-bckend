import mongoose from "mongoose"
import { Schema } from "mongoose"
import { serviceSchema } from "./Services.js"

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
            required: true,
        },
        services: {
            type: [serviceSchema],
        },
    },
    {
        timestamps: true,
    }
)

const Professional = mongoose.model("Professional", professionalSchema)

export default Professional

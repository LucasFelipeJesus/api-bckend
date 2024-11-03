import mongoose from "mongoose"

async function main() {
    try {
        await mongoose.connect(
            "mongodb+srv://pi2024:Caslu10@pi2024.zpxb9.mongodb.net/?retryWrites=true&w=majority&appName=Pi2024"
        )
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
    }
}

export default main

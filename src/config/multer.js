// Import multer and path
import multer from "multer"
import path from "path"
import fs from "fs"

const uploadsDir = "uploads"
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir)
}

// Configuração do armazenamento com multer para salvar a imagem em uma pasta local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../uploads") // Pasta onde as imagens serão salvas
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Nome do arquivo com timestamp único
    },
})

const upload = multer({ storage })

export default upload

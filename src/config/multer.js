import multer from "multer"
import fs from "fs"
import path from "path"

// Obtendo o diretório atual usando import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname)

// Caminho para o diretório de uploads na raiz do projeto
const uploadPath = path.resolve("uploads")

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Verifica se o diretório de uploads existe, se não, cria
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }) // Cria a pasta se não existir
        }
        cb(null, uploadPath) // Direciona para o caminho absoluto do diretório de uploads
    },
    filename: (req, file, cb) => {
        // Gera um nome único para o arquivo
        cb(null, Date.now() + "-" + file.originalname)
    },
})

// Verifique o tipo de arquivo se necessário
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            return cb(new Error("Only JPEG or PNG images are allowed"))
        }
        cb(null, true)
    },
}).single("Image") // Certifique-se de que o nome do campo no formulário é "image"

export default upload

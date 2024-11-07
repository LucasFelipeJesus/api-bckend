import fs from "fs"
import { google } from "googleapis"

const GOOGLE_API_FOLDER_ID = "18DPFJm--TFG3OpkwSuUVR_rJ9MXxx-D6"

// Função de upload para o Google Drive
async function uploadFileToGoogleDrive(fileName, filePath) {
    try {
        // Autenticação com a chave da conta de serviço do Google
        const auth = new google.auth.GoogleAuth({
            keyFile: "./googledrive.json", // Caminho para o arquivo de credenciais
            scopes: "https://www.googleapis.com/auth/drive", // Permissão para upload
        })

        // Inicializa a API do Google Drive
        const drive = google.drive({
            version: "v3",
            auth,
        })

        // Metadados do arquivo a ser carregado
        const fileMetadata = {
            name: fileName,
            parents: [GOOGLE_API_FOLDER_ID], // ID da pasta onde o arquivo será armazenado
        }

        // Corpo do arquivo (o arquivo que será carregado)
        const media = {
            mimeType: "image/jpeg", // Tipo MIME do arquivo (ajustar conforme necessário)
            body: fs.createReadStream("/uploads"), // Caminho para o arquivo que será enviado
        }

        // Realiza o upload do arquivo
        const res = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id", // Retorna apenas o ID do arquivo carregado
        })

        // Retorna o ID do arquivo carregado no Google Drive
        return res.data.id
    } catch (error) {
        console.log("Erro ao criar o arquivo:", error)
        throw error // Lança o erro para que seja tratado no controller
    }
}

export { uploadFileToGoogleDrive }

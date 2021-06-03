import { Request, Response } from 'express'
import { google } from 'googleapis'
import fs from 'fs'

interface ImageTypeData {
  id?: string,
  name?: string,
  webContentLink?: string,
  webViewLink?: string,
  thumbnailLink?: string
}

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET
const REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN

import Exercicio from '../models/Exercicio'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

async function uploadFile(file: Express.Multer.File) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now()}-${file.originalname}`,
        mimeType: file.mimetype
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path)
      }
    })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

async function deleteFile(id: string) {
  try {
    const response = await drive.files.delete({ fileId: id })
    console.log(response.data, response.status)
  } catch (error) {
    console.log(error.message)
  }
}

async function generatePublicUrl(fileId: string) {
  try {
    await drive.permissions.create({ fileId, requestBody: { role: 'reader', type: 'anyone' } })
    const result = await drive.files.get({ fileId, fields: 'webViewLink, webContentLink, thumbnailLink' })
    return result.data
  } catch (error) {
    console.log(error.message)
  }
}

export default {
  async create(req: Request, res: Response) {
    const { nome, descricao, video } = req.body
    const files = req.files as Express.Multer.File[]
    let imagens: ImageTypeData[] = []
    let imagem: ImageTypeData
    let links: ImageTypeData

    for (let I = 0; I < files.length; I++) {

      imagem = await uploadFile(files[I]) as ImageTypeData
      links = await generatePublicUrl(`${imagem.id}`) as ImageTypeData

      imagens.push({
        id: imagem.id,
        name: imagem.name,
        webContentLink: links.webContentLink,
        webViewLink: links.webViewLink,
        thumbnailLink: links.thumbnailLink
      })
    }

    // deleteFile('1VwurhJE6GgCQ5OH35Z-t0-5xnZIZEXa1')    

    return res.json({ nome, descricao, video, imagens })
  }
}

// https://console.cloud.google.com
// https://developers.google.com/oauthplayground
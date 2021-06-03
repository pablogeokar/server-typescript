import express from 'express'
import multer from 'multer'
import configMulter from './config/multer'

import ExercicioController from './controllers/exercicio.controller'

const upload = multer(configMulter)
//const upload = multer()


const routes = express.Router()

routes.get('/', (req, res) => { return res.json({ success: 'Serviço on-line' }) })
routes.post('/exercicio', upload.array('imagens'), ExercicioController.create)

export default routes
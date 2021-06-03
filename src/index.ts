import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
const app = express()

import routes from './routes'

const PORT = 8000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1', routes)
app.use('*', (req, res) => res.status(404).json({ error: 'Recurso não encontrado' }))

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});


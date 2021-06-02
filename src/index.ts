import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
const app = express()

const PORT = 8000;

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('OK')
})

//app.use('/api/v1/')
app.use('*', (req, res) => res.status(404).json({ error: 'Recurso não encontrado' }))

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});


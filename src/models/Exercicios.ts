import mongoose from '../database'

const ImagemSchema = new mongoose.Schema({
  imagem: { type: String, required: true }
})

const ExercicioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  video: { type: String },
  imagens: [ImagemSchema]
})

const Exercicio = mongoose.model("Exercicio", ExercicioSchema);

export default Exercicio
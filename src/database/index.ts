import mongoose from 'mongoose'

const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(`${process.env.MONGO_URI}`, connectionOptions, (err) => {
  if (!err) {
    console.log("Banco de Dados executando com sucesso.");
  } else {
    console.log(
      "Erro com a conexão ao Banco de Dados : " +
      JSON.stringify(err, undefined, 2)
    );
  }
});

mongoose.Promise = global.Promise;

export default mongoose
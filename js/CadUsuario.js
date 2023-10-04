const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conectar ao MongoDB usando Mongoose
mongoose.connect('mongodb://localhost:27017/cadastro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir um modelo para o usuário
const Usuario = mongoose.model('Usuario', {
  nome: String,
  email: String,
  celular: String,
  endereco: String,
  complemento: String,
  numero: String,
  bairro: String,
  cidade: String,
  uf: String,
  cep: String
});

// Rota para receber os dados do formulário
app.post('/cadastro', (req, res) => {
  const usuario = new Usuario(req.body);

  usuario.save((err) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar usuário.');
    } else {
      res.status(200).send('Usuário cadastrado com sucesso.');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

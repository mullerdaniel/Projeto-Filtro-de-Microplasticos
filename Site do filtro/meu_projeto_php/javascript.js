const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração de conexão com o banco de dados Railway
const db = mysql.createConnection({
  host: 'nozomi.proxy.rlwy.net',     // Host fornecido pelo Railway
  user: 'root',                      // Usuário do banco de dados
  password: 'BxzkLNojhCBBJoqxeJKDxkiPawFwUAMd', // Senha do banco de dados
  database: 'railway',                // Nome do banco de dados
  port: 22011,                       // Porta fornecida pelo Railway
});

// Testando a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  }
});

// Middleware
app.use(express.json());
app.use(cors());  // Para permitir requisições de diferentes origens (CORS)

// Rota para receber os feedbacks do formulário
app.post('/feedback', (req, res) => {
  const { nome, nota, observacoes } = req.body;

  // Comando SQL para inserir dados no banco de dados
  const query = 'INSERT INTO feedback (nome, nota, observacoes) VALUES (?, ?, ?)';
  
  db.query(query, [nome, nota, observacoes], (err, result) => {
    if (err) {
      console.error('Erro ao inserir feedback:', err);
      return res.status(500).send('Erro ao enviar feedback');
    }
    res.status(200).send('Feedback enviado com sucesso!');
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

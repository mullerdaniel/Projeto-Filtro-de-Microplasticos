// Importação das dependências
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');  // Importando o CORS
const app = express();

// **Habilitando CORS para uma origem específica**
app.use(cors({
    origin: 'http://127.0.0.1:5500'  // Permitir apenas essa origem (o seu front-end)
}));

// Middleware para processar JSON no corpo da requisição
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // ou o host do seu banco de dados
    user: 'root',      // seu usuário do MySQL
    password: '',      // sua senha do MySQL
    database: 'formulario'  // nome do banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para processar o feedback
app.post('/submit-feedback', (req, res) => {
    const { nome, nota, observacoes } = req.body;

    // Query SQL para inserir o feedback no banco de dados
    const query = 'INSERT INTO feedback (nome, nota, observacoes) VALUES (?, ?, ?)';

    db.execute(query, [nome, nota, observacoes], (err, results) => {
        if (err) {
            console.error('Erro ao salvar feedback: ', err);
            return res.status(500).send('Erro ao salvar feedback.');
        }
        console.log('Feedback salvo com sucesso:', results);
        return res.status(200).send('Feedback recebido com sucesso!');
    });
});

// Iniciar servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

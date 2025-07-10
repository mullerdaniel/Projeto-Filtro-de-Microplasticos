// Importação das dependências
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Habilitando CORS para uma origem específica (ajuste conforme necessário)
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// Middleware para processar JSON
app.use(bodyParser.json());

// Configuração do banco de dados Railway MySQL
const db = mysql.createConnection({
    host: 'nozomi.proxy.rlwy.net',
    user: 'root',
    password: 'BxzkLNojhCBBJoqxeJKDxkiPawFwUAMd',
    database: 'railway',
    port: 22011
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados Railway MySQL');
});

// Rota para processar o feedback
app.post('/submit-feedback', (req, res) => {
    const { nome, nota, observacoes } = req.body;

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

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

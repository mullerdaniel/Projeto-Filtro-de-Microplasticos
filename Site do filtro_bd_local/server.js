const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); 

app.use(cors({
    origin: 'http://127.0.0.1:5500'  
}));

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    
    password: '',    
    database: 'formulario' 
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

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

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

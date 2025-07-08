<?php
$servername = "nozomi.proxy.rlwy.net";
$username = "root";
$password = "BxzkLNojhCBBJoqxeJKDxkiPawFwUAMd";
$dbname = "railway";
$port = 22011;

// Criar conexão com o MySQL
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Receber dados do formulário via POST
$nome = $_POST['nome'] ?? '';
$nota = $_POST['nota'] ?? 0;
$observacoes = $_POST['observacoes'] ?? '';

// Preparar consulta SQL para evitar injeção
$stmt = $conn->prepare("INSERT INTO feedback (nome, nota, observacoes) VALUES (?, ?, ?)");

// Verificar se a preparação da consulta deu certo
if (!$stmt) {
    die("Erro ao preparar consulta: " . $conn->error);
}

// Vincular os parâmetros com os tipos: s = string, i = integer, s = string
$stmt->bind_param("sis", $nome, $nota, $observacoes);

// Executar a consulta SQL
if ($stmt->execute()) {
    echo "Feedback enviado com sucesso! Obrigado.";
} else {
    echo "Erro ao enviar feedback: " . $stmt->error;
}

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
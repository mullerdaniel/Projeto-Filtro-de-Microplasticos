// Configuração do Firebase (sem a sintaxe de módulos)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Verifique se está certo!
    projectId: "YOUR_PROJECT_ID", // Seu Project ID correto
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Captura o evento de envio do formulário
document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const nota = document.getElementById('nota').value;
    const observacoes = document.getElementById('observacoes').value;

    // Enviar dados para o Firestore
    try {
        await db.collection("feedbacks").add({
            nome,
            nota,
            observacoes,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Feedback enviado com sucesso!');
    } catch (error) {
        console.error("Erro ao enviar feedback:", error);
        alert('Erro ao enviar feedback');
    }
});

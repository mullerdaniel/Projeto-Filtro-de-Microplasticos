const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com", 
    projectId: "YOUR_PROJECT_ID", 
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const nota = document.getElementById('nota').value;
    const observacoes = document.getElementById('observacoes').value;

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

// Importação de funções do Firebase para autenticação, Firestore e controle de estado
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth,GoogleAuthProvider ,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Configuração do Firebase com as credenciais do projeto
const firebaseConfig = {
    apiKey: "AIzaSyC6LJg_a7uRf7nPKYaqq8erNI8qSII09Xs",
    authDomain: "pw2-ea53d.firebaseapp.com",
    projectId: "pw2-ea53d",
    storageBucket: "pw2-ea53d.firebasestorage.app",
    messagingSenderId: "726865400613",
    appId: "1:726865400613:web:4b5ffa48e6a7580a21c0cc"

};




// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Configura o Firebase Authentication
const db = getFirestore(); // Configura o Firestore
//const provider = new GoogleAuthProvider ();

// Monitora o estado de autenticação do usuário

onAuthStateChanged(auth, (user) => {
    if (user) {
       


        const userID = user.uid; // Obtenha o UID diretamente do estado do usuário autenticado
        console.log("Usuário autenticado com ID:", userID);

        // Salva o UID no Local Storage (caso necessário para persistência)
        localStorage.setItem("userID", userID);

        

        // Referência ao documento do Firestore
        const docRef = doc(db, "users", userID);

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    // Exibe os dados do Firestore na interface
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log("Documento não encontrado no Firestore para o ID:", userID);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar o documento:", error);
            });
    } else {
        console.log("Usuário não autenticado.");
        // Caso deseje redirecionar o usuário para a página de login:
        window.location.href = "index.html";
    }
});


// Lógica de logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); // Remove o ID do localStorage
    signOut(auth) // Realiza o logout
    .then(() => {
        window.location.href = 'index.html'; // Redireciona para a página de login
    })
    .catch((error) => {
        console.error('Error Signing out:', error);
    });
});

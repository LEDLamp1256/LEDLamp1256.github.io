// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVIQW2H64al26iDOgyj_GhVReqwUQ1DMg",
  authDomain: "financialapp-47aab.firebaseapp.com",
  databaseURL: "https://financialapp-47aab-default-rtdb.firebaseio.com",
  projectId: "financialapp-47aab",
  storageBucket: "financialapp-47aab.appspot.com",
  messagingSenderId: "1041157429079",
  appId: "1:1041157429079:web:3b8868693694ca613c1012",
  measurementId: "G-L86K9E75Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

//showing message function for logging in, logging out, errors, etc
function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    }, 5000);
}

//sign up button for signing up
const signUp = document.getElementById("btnSignup");
signUp.addEventListener("click", (event) => {
    event.preventDefault();

    //sets consts
    const email = document.getElementById("rEmail").value;
    const pass = document.getElementById("rPass").value;
    
    //creates user with said email and pass
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) =>{
        //sets basic information in database (email)
        const user = userCredential.user;
        const userData = {
            email : email
        };
        showMessage("Account created", "signUpMessage");
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() =>{
            //on successful creation refs to signin page
            window.location.href="index.html";
        })
        .catch((error) =>{
            console.error("error writing document", error)
        })
    })
    .catch((error) =>{
        const errorCode = error.code;
        if(errorCode == "auth/email-already-in-use"){
            showMessage("email address exists alr", "signUpMessage");
        }
        else{
            showMessage("unable to create account", "signUpMessage");
        }
    })
})

//sign in button for signing in
const signIn = document.getElementById("btnLogin");
signIn.addEventListener("click", (event) =>{
    event.preventDefault();
    
    //settings consts for important information
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const auth = getAuth(app);

    //signs in
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        showMessage("login is successful", "loginMessage");
        const user = userCredential.user;
        //sets user id in local storage
        localStorage.setItem("loggedInUserId", user.uid);
        //refs to main page
        window.location.href = "main.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode === "auth/invalid-credentials"){
            showMessage("incorrect email/pass", loginMessage);
        }
        else{
            showMessage("account doesnt exist", loginMessage);
        }
    })
})

//toggle visibility between sign in and signup
function hideToggle(name){
    var x = document.getElementsByClassName("text");
    for(var i of x){
        if(i.classList.contains(name)){
            i.style.display = "block";
        }
        else{
            i.style.display = "none";
        }
    }
}

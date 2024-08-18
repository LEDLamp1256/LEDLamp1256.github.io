//todo: set default values on input boxes to be retrieved from database, add pichart

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

//chart stuff (loads google charts packages needed for pichart)
google.charts.load("current", {"packages":["corechart"]});

//basic starter config for firebase
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let date = new Date();
let currentDay = date.getDate();
//month : 1-12
let currentMonth = date.getMonth();

let daysLeft = calcDays(currentDay, currentMonth);
document.getElementById("d").innerText = "Days left : " + String(daysLeft);

function calcDays(currDay, currMonth){
    if (currMonth == 1 || currMonth == 3 || currMonth == 5 || currMonth == 7 || currMonth == 8 || currMonth == 10 || currMonth == 12){
        return 31 - currDay;
    }
    if (currMonth == 4 || currMonth == 6 || currMonth == 9 || currMonth == 11){
        return 30 - currDay;
    }
    if(currMonth == 2){
        year = date.getFullYear();
        if(year % 400 == 0 || ((year % 4 == 0) && (year % 100 != 0))){
            return 28 - currDay;
        }
        return 29 - currDay;
    } 
}

//gets initial values of income, food, bills, misc from database, and sets them to the value in 
//each appropriate input box
const currUserId = localStorage.getItem("loggedInUserId");
const docRef = doc(db, "users", currUserId);
let startSnap = await getDoc(docRef);
if(startSnap.exists()){
    let initI = startSnap.data().totalIncome;
    let initF = startSnap.data().food;
    let initB = startSnap.data().bills;
    let initM = startSnap.data().misc;
    document.getElementById("i").value = initI;
    document.getElementById("f").value = initF;
    document.getElementById("b").value = initB;
    document.getElementById("m").value = initM;
}
else{
    console.log("init number error")
}
//sets numbers for income, food, bills, misc from values in input boxes for later use.
let i = Number(document.getElementById("i").value);
let f = Number(document.getElementById("f").value);
let b = Number(document.getElementById("b").value);
let m = Number(document.getElementById("m").value);

//gets logged email to put at top left of screen
onAuthStateChanged(auth, (user) => {
    if(currUserId){
        const docRef = doc(db, "users", currUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if(docSnap.exists()){
                //sets "email: " text at the top right
                const userData = docSnap.data();
                document.getElementById("loggedEmail").innerText = userData.email;
            }
            else{
                console.log("no document found matching id");
            }
        })
        .catch((error) => {
            console.log(error)
            console.log("error getting document");
        });
    }
    else{
        console.log("user id not found in local data")
    }
});

//button to submit values on budgeting tab
const budgetEnterButton = document.getElementById("budgetEnterButton");
budgetEnterButton.addEventListener("click", (event) => {
    //unpaid bills/dues etc
    let unpaid = Number(document.getElementById("u").value);
    var r = 0;
    if((i - (f + b + m)) >= 0){
        r = Number(i - (f + b + m));
    }
    //setting appropriate values of text boxes/fields
    document.getElementById("r").innerText = "Remaining Money : " + String(r - unpaid);
    document.getElementById("budget").innerText = "You can afford to spend : $" + String(Math.floor((r - unpaid)/daysLeft * 100) / 100) + " per day";
});

//button to submit values on spending breakdown tab
const enterButton = document.getElementById("enterButton");
enterButton.addEventListener("click", (event) => {
    getDoc(docRef)
    .then((docSnap) => {
        if(docSnap.exists()){
            //income, food, bills, misc, updating value based on the values in the appropriate input boxes
            i = Number(document.getElementById("i").value);
            f = Number(document.getElementById("f").value);
            b = Number(document.getElementById("b").value);
            m = Number(document.getElementById("m").value);
            setDoc(docRef, {
                    email: docSnap.data().email,
                    totalIncome: i,
                    food: f,
                    bills: b,
                    misc: m
            });
            drawChart();
        }
        else{
            console.log("no document found matching id");
        };
    });
    
});

//log out button
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (event) => {
    //first updates to database
    getDoc(docRef)
    .then((docSnap) => {
        if(docSnap.exists()){
            //income, food, bills, misc, updating value based on the values in the appropriate input boxes
            i = Number(document.getElementById("i").value);
            f = Number(document.getElementById("f").value);
            b = Number(document.getElementById("b").value);
            m = Number(document.getElementById("m").value);
            setDoc(docRef, {
                    email: docSnap.data().email,
                    totalIncome: i,
                    food: f,
                    bills: b,
                    misc: m
            });
        }
        else{
            console.log("no document found matching id");
        };
    });
    //then removes login id from local storage and logs out
    localStorage.removeItem("loggedInUserId");
    signOut(auth)
    .then(() => {
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.log("Error in signing out", error);
    });
});

//draw chart function for google pichart maker
function drawChart(){
    //catching negative numbers in the money that is left
    var r = 0;
    if((i - (f + b + m)) >= 0){
        r = Number(i - (f + b + m));
    }
    //setting array for google table making library
    var data = google.visualization.arrayToDataTable([
        ["Task", "Money Spent"],
        ["Remaining", Number(r)],
        ["Food", Number(f)],
        ["Bills", Number(b)],
        ["Misc", Number(m)]
    ]);

    //can add additional options, title was all that is needed
    var options = {
        title: "Spending Breakdown",
        
    };

    //creates chart object, google visualizer
    var chart = new google.visualization.PieChart(document.getElementById("piChart"));

    chart.draw(data, options);
}

const spendingMenu = document.getElementById("spendingMenu");
spendingMenu.addEventListener("click", (event) =>{
    hideToggle("spendingMenu");
})

const budgetMenu = document.getElementById("budgetMenu");
budgetMenu.addEventListener("click", (event) =>{
    hideToggle("budgetMenu");
})

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


//initial drawChart to load a chart on file load
drawChart();
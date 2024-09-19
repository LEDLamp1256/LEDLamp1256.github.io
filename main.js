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

//sends user to login screen if not logged in/no logged in userid
if(localStorage.getItem("loggedInUserId") === null){
    console.log("not logged in");
    window.location.href = "index.html";
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const currUserId = localStorage.getItem("loggedInUserId");
const docRef = doc(db, "users", currUserId);

//date stuff for budgeting tab
let date = new Date();
let currentDay = date.getDate();
//month : 1-12
let currentMonth = date.getMonth();
//gets days left in month
let daysLeft = calcDays(currentDay, currentMonth);

//gets initial values of income, food, bills, misc from database, and sets them to the value in 
//each appropriate input box
let categoryList = [{name:"Bills", id: 1, value: 0}, {name:"Food", id: 2, value: 0}, {name:"Savings", id: 3, value: 0}, {name:"Misc", id: 4, value: 0}];
let startSnap = await getDoc(docRef);
if(startSnap.exists()){
    let initI = startSnap.data().totalIncome;
    if(startSnap.data().categoryLists != null){
        categoryList = startSnap.data().categoryLists;
    };
    //to trim, not sure if needed
    document.getElementById("i").value = initI;
}
else{
    console.log("init number error")
}

//sets numbers for income, food, bills, misc from values in input boxes for later use.
let inc = Number(document.getElementById("i").value);

//update html with current categories
function updateHtml(){
    let categories = document.getElementById("categoryList");
    let addedHtml = "";
    // for(var i = 0; i < categoryList.length; i++){
    //     let temp = document.getElementById(i);
    //     addedHtml += "<li><label for=" + i.id +  "></label>" + i.name + ": <input type='number' id=" + i.id + " value= " + i.value + " name=" + i.name + "></li>";
    //     // addedHtml += "<li><label for=" + i.id +  "></label>" + i.name + ": <input type='number' id=" + i.id + " value= " + i.value + " name=" + i.name + "></li>"
    // };
    // for(var i of categoryList){
    //     if(!addedHtml.includes(i.name)){
    //         addedHtml += "<li><label for=" + i.id +  "></label>" + i.name + ": <input type='number' id=" + i.id + " value= " + i.value + " name=" + i.name + "></li>";
    //     }
        
    // };
    categories.innerHTML = addedHtml;
};

//gets logged email to put at top left of screen
onAuthStateChanged(auth, (user) => {
    if(currUserId){
        //gets document ref with user id
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
    for(var i of categoryList){
        inc -= i.value;
    }
    if(inc >= 0){
        r = Number(inc);
    }
    //setting appropriate values of text boxes/fields
    document.getElementById("r").innerText = "Remaining Money : " + String(r - unpaid);
    document.getElementById("budget").innerText = "You can afford to spend : $" + String(Math.floor((r - unpaid)/daysLeft * 100) / 100) + " per day";
    document.getElementById("budgetWeek").innerText = "Or, You can afford to spend : $" + String(Math.floor((r - unpaid)/(daysLeft / 7) * 100) / 100) + " per week";
});

//button to submit values on spending breakdown tab
const enterButton = document.getElementById("enterButton");
enterButton.addEventListener("click", (event) => {
    getDoc(docRef)
    .then((docSnap) => {
        if(docSnap.exists()){
            //income, food, bills, misc, updating value based on the values in the appropriate input boxes
            inc = Number(document.getElementById("i").value);
            updateHtml();
            setDoc(docRef, {
                    email: docSnap.data().email,
                    totalIncome: inc,
                    categoryLists: categoryList
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
            inc = Number(document.getElementById("i").value);
            updateHtml();
            setDoc(docRef, {
                    email: docSnap.data().email,
                    totalIncome: inc,
                    categoryLists: categoryList
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
    let sum = 0;
    for(var i of categoryList){
        sum += i.value;
    }
    if(sum <= inc){
        var r = 0;
        if((inc - sum) >= 0){
            r = Number(inc - sum);
        }

        //setting array for google table making library
        var dataArray = [["Task", "Money Spent"]];
        for(var i of categoryList){
            dataArray.push([i.name, Number(i.value)]);
        }
        var data = google.visualization.arrayToDataTable([
            dataArray
        ]);
        

        //can add additional options, title was all that is needed
        var options = {
            title: "Spending Breakdown",
            backgroundColor: "#A3D6D6"
        };

        //creates chart object, google visualizer
        var chart = new google.visualization.PieChart(document.getElementById("piChart"));

        chart.draw(data, options);
    }
    else{
        console.log("error")
    }
    getDoc(docRef)
    .then((docSnap) => {
        if(docSnap.exists()){
            //income, food, bills, misc, updating value based on the values in the appropriate input boxes
            inc = Number(document.getElementById("i").value);
            updateHtml();
            setDoc(docRef, {
                    email: docSnap.data().email,
                    totalIncome: inc,
                    categoryLists: categoryList
            });
        }
        else{
            console.log("no document found matching id");
        };
    });
}

//function for calculating days in month
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

//menu buttons
const spendingButton = document.getElementById("spendingButton");
spendingButton.addEventListener("click", (event) => {
    hideToggle("spending");
});

const budgetingButton = document.getElementById("budgetingButton");
budgetingButton.addEventListener("click", (event) => {
    hideToggle("budget");
});

//adding category button
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", (event) => {
    for(var i of categoryList){
        let tempId = i.id;
        i.value = Number(document.getElementById(tempId).value);
    };
    categoryList.push({name: document.getElementById("addCategory").value, id: categoryList.length + 1, value: 0});
    updateHtml();
});

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", (event) => {
    categoryList.pop();
    updateHtml();
});

//script for toggling visibility
function hideToggle(name){
    var x = document.getElementsByClassName("text");
    for(var i of x){
        if(i.classList.contains(name)){
            i.style.display = "block";
        }
        else{
            i.style.display = "none";
        }
    };
};

//adds check for email if user id is there but auth state not changed
if(currUserId){
    //gets document ref with user id
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


updateHtml();

//sets value of days left text box in budgeting screen
document.getElementById("d").innerText = "Days left : " + String(daysLeft);

//initial drawChart to load a chart on file load
drawChart();
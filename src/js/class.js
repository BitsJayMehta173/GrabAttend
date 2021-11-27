import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore,collection,onSnapshot,updateDoc,doc,getDoc
        } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";

      
const firebaseConfig = {
        apiKey: "AIzaSyCJpo8GkLkdcHrhKXpxVMzYGJuuhKOoc7o",
        authDomain: "grabattend-c412f.firebaseapp.com",
        projectId: "grabattend-c412f",
        storageBucket: "grabattend-c412f.appspot.com",
        messagingSenderId: "984476525322",
        appId: "1:984476525322:web:ac20e0c4d920ef10ad10f3"
      };   

    const app = initializeApp(firebaseConfig);

    const db= getFirestore()

    const colRef = collection(db, 'attendance')

const ccode=document.getElementById("ccode");
const sname=document.getElementById("sname");
const joinbtn=document.getElementById("joinbtn");

if(Notification.permission !== "denied"){
  Notification.requestPermission()
};

let info=[]
let classlist=['attendance','cs101','ma201','test'];
let flag=0;
joinbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    for(let i=0;i<4;i++){
      if(ccode.value==classlist[i]){
        flag=1;
        info.push(ccode.value);
    localStorage.setItem('information',JSON.stringify(info));
    info.push(sname.value);
    localStorage.setItem('information',JSON.stringify(info));
    location.href = './public/counter.html';
    break;
    }
    }
    if(flag==0){
    alert('Classroom Not Found');}
    
})




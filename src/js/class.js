import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore,collection,onSnapshot,updateDoc,doc,getDoc,setDoc,getDocs
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

    const db= getFirestore();

    const colRef = collection(db, 'attendance')

const ccode=document.getElementById("ccode");
const sname=document.getElementById("sname");
const joinbtn=document.getElementById("joinbtn");
const createroom=document.getElementById("createroom");

var list=[];
var listy=[];

function check(){
  let docRef =doc(db, 'classlist', 'classarray');
  getDoc(docRef).then((doc)=>{
    list=doc.data().arraylist;
    list.forEach(element => {
      listy.push(element);
    });
  })
}
check();

let flag=0;
let info=[];
joinbtn.addEventListener("click",()=>{
  for(let i=0;i<listy.length;i++){
    if(ccode.value==listy[i]){
      console.log('Found');
      info.push(ccode.value);
          localStorage.setItem('information',JSON.stringify(info));
          info.push(sname.value);
          localStorage.setItem('information',JSON.stringify(info));
          location.href = './public/counter.html';
      flag=1;
    }
  }
  if(flag==0){
    alert('Classroom Not Found!');
  }
})


function roomcreate(){
  const classRef = doc(db, ccode.value, 'attendance');
  setDoc(classRef, { limit: 15,num:0 }, { merge: false });
  const classsRef = doc(db, ccode.value, 'reset');
  setDoc(classsRef, { resetreq: 1 }, { merge: false });
};

createroom.addEventListener('click',()=>{
  let flaggy=0;
  for(let i=0;i<listy.length;i++){
    if(ccode.value==listy[i]){
      console.log("Classroom Already Exist");
      alert('Classroom Already Exist')
      ccode.value="";
      flaggy=1;
    }
  }
  if(flaggy==0){
  let docRef =doc(db, 'classlist', 'classarray');
    listy.push(ccode.value);
    updateDoc(docRef,{
      arraylist: listy
             })
    roomcreate();
    console.log('classroom created please log into it');
    alert('Classroom Created Please Log into it');
          }

})


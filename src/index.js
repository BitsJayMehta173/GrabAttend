import {initializeApp} from 'firebase/app'
import{
    getFirestore,collection,onSnapshot,updateDoc,doc,getDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCJpo8GkLkdcHrhKXpxVMzYGJuuhKOoc7o",
    authDomain: "grabattend-c412f.firebaseapp.com",
    projectId: "grabattend-c412f",
    storageBucket: "grabattend-c412f.appspot.com",
    messagingSenderId: "984476525322",
    appId: "1:984476525322:web:ac20e0c4d920ef10ad10f3"
  };

  //init firebase app
  initializeApp(firebaseConfig);

  // init services
  const db= getFirestore()
  
  // collection ref
  const colRef = collection(db, 'attendance')

const attnum = document.getElementById("attnum");
const vote =document.getElementById("vote");
const notice =document.getElementById("notice");
const votezero =document.getElementById("votezero");
const resetvote=document.getElementById("resetvote");



//On every Realtime update
onSnapshot(colRef, (snapshot)=>{
      const current=snapshot.docs[0].data().num;
      console.log('Current Attendance Vote Count is ',current);
      attnum.innerHTML=current;
  })

const docRef =doc(db, 'attendance', 'M2L3Pw6PGWxEguVUGyDh')
  
let limit;


//Attendance Vote button 
vote.addEventListener('click',()=>{
    getDoc(docRef)
  .then((doc)=>{
    limit=doc.data().limit;
  var n=parseInt(attnum.innerText);
    n=n+1;
    if(n>=limit){
        notice.style.display='block';
        alert('GIVE ATTENDANCE');
    }
    updateDoc(docRef,{
        num: n
    })
  })
})

votezero.addEventListener('click',()=>{
    updateDoc(docRef,{
        num: 0
    })
})

let resvote;
resetvote.addEventListener('click',()=>{
    const docRef =doc(db, 'attendance', 'Qd3VFt7QVT9LkA6SAvtR')
    getDoc(docRef)
  .then((doc)=>{
    resvote=doc.data().resetreq;
    resvote+=1;
    updateDoc(docRef,{
        resetreq: resvote
    })
    .then(()=>{
        console.log('requested for Vote reset');
    })
      })
})


  


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

      const db= getFirestore();
      
      const info=JSON.parse(localStorage.getItem('information'));
  
      const colRef = collection(db, info[0])

      const attnum = document.getElementById("attnum");
      const vote =document.getElementById("vote");
      const notice =document.getElementById("notice");
      const votezero =document.getElementById("votezero");
      const resetvote=document.getElementById("resetvote");


      onSnapshot(colRef, (snapshot)=>{
            const current=snapshot.docs[0].data().num;
            console.log('Current Attendance Vote Count is ',current);
            attnum.innerHTML=current;
        })

      const docRef =doc(db, info[0], 'attendance')
        
      let limit;
      
        function attendNotification(){
          const notification= new Notification("Give Attendance Fast!",
            {body:"The Attendance Vote Limit has Crossed!"
        }); 
        }
        let p=0;
      vote.addEventListener('click',()=>{
          getDoc(docRef)
        .then((doc)=>{
          limit=doc.data().limit;
        var n=parseInt(attnum.innerText);
          n=n+1;
          if(n>=limit+p){
              p+=8;
              notice.style.display='block';
              
              if(Notification.permission==="granted"){
                attendNotification();
              }
              else if(Notification.permission !=="denied"){
                Notification.requestPermission().then((permission)=>{
                  attendNotification();
                });
              }

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
          const docRef =doc(db, info[0], 'reset')
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
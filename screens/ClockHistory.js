
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, Button, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../firebase/config';

export const HomeScreen = ({navigation}) => {

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idd, setIdd] = useState('');
  const [timer, setTimer] = useState('');
  const [users, setUsers] = useState('');

  useEffect(() => {
     console.log('Hoo you okay')
    // change();
    // readall();  
    // allUsers();
    getDocs(collection(db, "users")).then(docSnap =>{
      let users =[];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', users);
      setUsers(users);
      console.log(users)
  });

  },[])
  

  // componentWillMount(){
  //   change();
  // }
  
  
  console.log(timer)

  // function change() {
  //   setTimeout(() => {
  //     setTimer('Yes')
  //     console.log(timer)
  //   }, "1000");
  // }


  function create () {
    addDoc(collection(db, "users"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Added....");
alert("Added")
  }


  function update () {
    updateDoc(doc(db, "users", "SYvJ4dAp9joAjO9i5ppx"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Updated....");
alert("Updated")
  }


  function Delete () {
    deleteDoc(doc(db, "users", idd)) 
    console.log("Deleted....", idd);
alert("Deleted", idd)
  }


  
  function read () {
    getDoc(doc(db, "users", idd), {

    }).then((docData) => {
      if (docData.exists()) {
        console.log(docData.data().Clocks);
        setName(docData.data().username)
        setEmail(docData.data().email)
      }else{
        console.log("No such data");
        alert("No such data")
      }
}).catch((error) => {
  console.log(error);
});
  }



  function readall () {
    getDocs(collection(db, "Clocks")).then(docSnap =>{
      let Clocks =[];
      docSnap.forEach((doc) => {
        Clocks.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', Clocks);
});
}

// function allUsers () {
//   getDocs(collection(db, "users")).then(docSnap =>{
//     let users =[];
//     docSnap.forEach((doc) => {
//       users.push({ ...doc.data(), id:doc.id})
//     });
//     console.log('Document data', users);
//     setUsers(users);
//     console.log(users)
// });
// }




function readByQuery () {
  getDocs(query(collection(db, "users"), where('email' , '==', 'solomon@gmail.com'))).then(docSnap =>{
    let users =[];
    docSnap.forEach((doc) => {
      users.push({ ...doc.data(), id:doc.id})
    });
    console.log('Document data', users);
});
}




  




  function login () {
    console.log(users);
    
   const checkData = users.filter(d => d.email >= "atundepeter");
    console.log("email Output",checkData);
    
    const checkName = users.filter(d => d.username == "Solomon");
    console.log("Fetch by username",checkName);
    const email = (checkName[0])
    console.log("User Email",email.email);
    
  

    
  }

  function log_in() {
    if (!users) {
      alert('pls WAIT Loading')
    } else {
      console.log(users);

      const pass = users.filter(d => d.password == 1234 && d.username == "Atunde");
      console.log("Passed",pass);

      if(pass == ''){
          console.log('Access denied')
      }else {
          console.log('passed')
          const user = (pass[0])
          const username = (user.username)
          navigation.push("Details", {
            username: username,
            userdata:user
          });
          console.log('username', user.username )
      }

      

    //   const myJSON = JSON.stringify(checkName)
    //   console.log(myJSON)
    }
   
  }

function Proceed () {
  console.log('ok')
  setTimer("Okay")
}


    return (
      <TailwindProvider>
      <View className="flex-1 justify-center items-center bg-pink-500 font-bold ">
        <View className="mt-10 flex space-y-4 mb-20">
          <View>
            <Text className="font-bold">Clock History </Text>
          </View>
          <View>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
          </View>
        </View>
        <View className=" flex-1 w-[90%] ">
          <Text>INSERT</Text>
        </View>
      </View>
    </TailwindProvider>
    );
  }







export default HomeScreen
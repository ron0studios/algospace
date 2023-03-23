// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMw7EjYjWkPP4lVo8kXysqie4kFXiD1PY",
  authDomain: "algospace-ron0.firebaseapp.com",
  projectId: "algospace-ron0",
  storageBucket: "algospace-ron0.appspot.com",
  messagingSenderId: "365047884037",
  appId: "1:365047884037:web:6fbf793e5dde5b11076f6c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const projectFirestore = getFirestore()


/*
const choice = inp => {
  return inp[Math.round(Math.random()*(inp.length-1))]
}

for(let i = 0; i < 10; i++)
{
  let out = "ZZFillerProblem"
  let tag = []
  for(let j = 0; j < 10; j++)
  {
    out += choice(" abcdefghijklmnopqrstuvwxyz")
  }
  for(let j = 0; j < Math.random()*5; j++)
  {
    tag.push(choice(["dp","bfs","dfs","trees","graphs","bruteforce","segment","greedy","maths"]))
  }

  const obj = {
    contest: choice(["BIO", "USACO", "IOI", "CF", "HR"]),
    difficulty: choice(["EASY", "MEDIUM", "HARD", "INSANE"]), 
    tags: tag,
    title: out
  }
  console.log(obj)

  addDoc(collection(projectFirestore,"problems"),obj)
}
*/


export { projectFirestore }
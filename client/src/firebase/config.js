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



const choice = inp => {
  return inp[Math.round(Math.random()*(inp.length-1))]
}
/*
for(let i = 0; i < 20; i++)
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
    contest: choice(["BIO", "USACO", "IOI", "CF", "HR", "SPOJ", "DMOJ"]),
    difficulty: choice(["EASY", "MEDIUM", "HARD", "INSANE"]), 
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n $R_n(x)=\\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$\n ## Input\n ad minim veniam, quis nostrud exercitation ullamco $0 \\leq N \\leq 100$.\n ## Output\n reprehenderit in voluptate **X**.\n ## Example\n ### input\n \`\`\` \n 3 ABCD \n \`\`\`\n ### output\n\`\`\`\n23 esd\n329 lol\n231 III\n\`\`\`\n### explanation\nExcepteur sint occaecat cupidatat non proident.\n ",
    tags: tag,
    title: out,
    testcases: ["1","2","3","4","5"],
    answers: ["1","2","3","4","5"]
  }
  console.log(obj)

  addDoc(collection(projectFirestore,"problems"),obj)
}
*/

export { projectFirestore }
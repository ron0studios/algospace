const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const {spawn} = require('child_process');
const fs = require('fs');

const app = express()

app.use(bp.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))



app.get("/api", (req, res) => {
    //res.send("hello there")
    res.json({"users": ["userOne", "userTwo", "ron0studios"]})
})

const runTest = (testcase, expected) => {
    return new Promise((resolve, reject) => { 
      const python = spawn('python', ['code.py']);

      setTimeout(()=>{resolve("TLE")},1000) // time limit exceeded

      python.stdin.write(testcase.toString())
      python.stdin.end()
      let result = null;

      python.stdout.on('data', (data) => {
          console.log('Pipe data from python script ...');
          result = data.toString();
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
          if(code){
            resolve("RE") // runtime error
          }
          
          // send data to browser
          if(result == expected)
          { 
              resolve("AC") // accepted
          }
          else
          {
              resolve("WA") // wrong answer
          }
      });
    })
}

app.post("/submit", async (req,res) => {
    console.log("received")

    const {code, language} = req.body
    language;


    fs.writeFile('code.py', code, function (err) {
        if (err) throw err;
        console.log('Saved!');
    }); 

    const testcases = [7,3,2,1,5, 10000000, 10000000000]
    const answers   = [28,6,3,1,15, 50000005000000,  50000000005000000000]
    const results   = []

    for(let i = 0; i < testcases.length; i++){
        console.log(i)
        let tc = await runTest(testcases[i],answers[i]);
        results.push(tc)
        if(tc != "AC")
        {
          break;
        }
    }

    res.json({output: results})


    //res.json({hi:2})
})

app.listen(5000, () => {console.log("server started on port 5000 :D")})

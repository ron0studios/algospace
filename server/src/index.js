const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const {exec, spawn} = require('child_process');
const fs = require('fs');

const app = express()

app.use(bp.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))



app.get("/api", (req, res) => {
    //res.send("hello there")
    res.json({"users": ["userOne", "userTwo", "ron0studios"]})
})

const runPythonTest = (testcase, expected) => {
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
          if(code != 0 || code === null){
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


const runCpp20Test = (testcase, expected) => {
    return new Promise((resolve, reject) => {
      console.log("compiling c++20...")
      exec('g++ -Wall -Wextra -std=c++20 '+'code.cpp'+' -o ' + 'code', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          resolve("CE");
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          resolve("CE");
        }
        setTimeout(()=>{resolve("TLE")},1000) // time limit exceeded

        const cpp = spawn('./code');

        cpp.stdin.write(testcase.toString())
        cpp.stdin.end()

        let result = null;

        cpp.stdout.on('data', (data) => {
            console.log('Pipe data from c++20 script ...');
            result = data.toString();
        });


        // in close event we are sure that stream from child process is closed
        cpp.on('close', (code) => {
            console.log(code);
            if(code != 0 || code === null){
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

      });


    });
}




app.post("/submit", async (req,res) => {
    console.log("received")

    const {code, language} = req.body
    const lang2ext = {cpp20:"cpp",py3:"py"}
    
    fs.writeFile('code.'+lang2ext[language], code, function (err) {
        if (err) throw err;
        console.log('Saved!');
    }); 

    const testcases = [7,3,2,1,5, 10000000, 10000000000]
    const answers   = [28,6,3,1,15, 50000005000000,  50000000005000000000]
    const results   = []

    

    for(let i = 0; i < testcases.length; i++){
      console.log(i);

      let tc;
      switch(language){
        case 'py3':
          tc = await runPythonTest(testcases[i],answers[i]);
          break;
        case 'cpp20':
          tc = await runCpp20Test(testcases[i],answers[i]);
          break;
      }
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

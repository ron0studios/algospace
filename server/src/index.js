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

const runPythonTests = async (testcases, answers) => {
    let results = []

    for(let i = 0; i < testcases.length; i++) {
      let result = await new Promise((resolve, _reject) => { 
        const python = spawn('python', ['code.py']);

        setTimeout(()=>{resolve("TLE")},1000) // time limit exceeded

        python.stdin.write(testcases[i].toString())
        python.stdin.end()
        let output = null;

        python.stdout.on('data', (data) => {
            console.log('Pipe data from python script ...');
            output = data.toString().trim();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            if(code != 0 || code === null){
              resolve("RE") // runtime error
            }
            
            // send data to browser
            if(output == answers[i])
            { 
                resolve("AC") // accepted
            }
            else
            {
                resolve("WA") // wrong answer
            }
        });
      })

      results.push(result)
      if(result != "AC")
      {
        break;
      }
    }

    return results;
}


const runCpp20Tests = async (testcases, answers) => {
    let results = []

    console.log("compiling c++20...")
    let compile = await new Promise((resolve, _reject) => {
      exec('g++ -Wall -Wextra -std=c++20 '+'code.cpp'+' -o ' + 'code', (error, _stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          resolve("CE");
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          resolve("CE"); // compilation error
          return;
        }
        resolve("CS") // compilation successful
      });
    }).catch((err)=>{throw err})

    if(compile == "CE") return ["CE"]

    console.log("compiled! now running testcases...")
    
    for(let i = 0; i < testcases.length; i++) { 
      console.log(`Testcase #${i+1}:`)
      let result = await new Promise((resolve, _reject) => {
          const cpp = spawn('./code');

          setTimeout(()=>{resolve("TLE")},1000) // time limit exceeded

          cpp.stdin.write(testcases[i].toString())
          cpp.stdin.end()

          let output = null;

          cpp.stdout.on('data', (data) => {
              output = data.toString().trim();
          });

          cpp.stderr.on('data', (data) => console.log(data.toString()))


          // in close event we are sure that stream from child process is closed
          cpp.on('close', (code) => {
              if(code != 0 || code === null){
                resolve("RE") // runtime error
              }
              
              // send data to browser
              if(output == answers[i])
              { 
                  resolve("AC") // accepted
              }
              else
              {
                  resolve("WA") // wrong answer
              }
          });

      });

      results.push(result);
      if(result != "AC")
      {
        break;
      }

      
    }

  return results;
}




app.post("/submit", async (req,res) => {
    console.log("received")

    const {code, language} = req.body
    const lang2ext = {cpp20:"cpp",py3:"py"}
    
    await new Promise( (resolve, reject) => {
      fs.writeFile('code.'+lang2ext[language], code, (err) => {
        if (err) reject(err);
        console.log("saved!")
        resolve();
      }); 
    }).catch((err)=>{console.log(err)});


    // example problem statement:
    // print the sum of the first n numbers, given n (inclusive) 
    // if n is even, also print "even"
    const testcases = ["7","3","2","1","5","10000000","10000000000"]
    const answers   = ["28","6","3\neven","1","15","50000005000000\neven","50000000005000000000\neven"]

    let results     = [];

    

    switch(language){
      case 'py3':
        results = await runPythonTests(testcases,answers);
        break;
      case 'cpp20':
        results = await runCpp20Tests(testcases,answers);
        break;
    }


    res.json({output: results})


    //res.json({hi:2})
})

app.listen(5000, () => {console.log("server started on port 5000 :D")})

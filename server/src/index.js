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


app.post("/submit", (req,res) => {
    console.log("received")

    const {code, language} = req.body
    let dataToSend = "";


    fs.writeFile('code.py', code, function (err) {
        if (err) throw err;
        console.log('Saved!');
    }); 

    const python = spawn('python', ['code.py']);

    python.stdin.write("7")
    python.stdin.end()
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.json({output: dataToSend})
    });


    //res.json({hi:2})
})

app.listen(5000, () => {console.log("server started on port 5000 :D")})
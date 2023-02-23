const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
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
    console.log(req.body)
    //res.send("hello there!")
    res.json({hi:2})
})

app.listen(5000, () => {console.log("server started on port 5000 :D")})
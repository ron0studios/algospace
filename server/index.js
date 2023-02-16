const express = require('express')
const app = express()
app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "ron0studios"]})
})

app.listen(5000, () => {console.log("server started on port 5000 :D")})
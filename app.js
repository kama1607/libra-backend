const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = process.env.PORT || 3000
const cors = require("cors")
const db = require("./config/dbConnect")

const demoR = require("./reports/studentInfoPDF")
    
const accR = require("./reports/accountList")
const bkslR = require("./reports/bookList")

const authorR = require("./routes/authorRoute")
const bookR = require("./routes/bookRoute")
const accountR = require("./routes/accountingRoute")
const studentR = require("./routes/studentRoute")
const classR = require("./routes/classRoute")



db.authenticate().then(() =>{
    console.log("DB connected ...")
}).catch(err => {
    console.log("Error", err)
})

app.use(express.json(), cors())

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


app.use(bodyParser.urlencoded({extended: true}))
app.use(authorR)
app.use(bookR)
app.use(accountR)
app.use(studentR)
app.use(classR)

app.use(accR)
app.use(demoR)
app.use(bkslR)

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`)
})


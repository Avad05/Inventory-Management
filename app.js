require ("dotenv").config();
const express = require('express');
const app = express();
const path = require("node:path");
const homeRouter = require('./routers/home');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use("/", homeRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, (error) =>{
    if(error){
        return error;
    }
    console.log(`Running server on PORT ${PORT}`);
})

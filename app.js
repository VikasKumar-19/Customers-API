const express = require('express');
const CustomerRouter = require('./Route/customers');

const app = express();

app.use(express.json());

app.use("/customers", CustomerRouter);

app.get("/",(req, res)=>{
  res.status(200).json({message: "home Page"})
})

app.listen("3000",()=>{
  console.log("server is running at port no http://localhost:3000");
})
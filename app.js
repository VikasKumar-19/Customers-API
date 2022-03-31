const express = require('express');
const CustomerRouter = require('./Route/customers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/customers", CustomerRouter);

app.get("/",(req, res)=>{
  res.status(200).json({message: "home Page"})
})

app.listen(port,()=>{
  console.log("server is running at port no http://localhost:3000");
})
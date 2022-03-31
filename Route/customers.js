const express = require('express');
const customers = require("../customers.json");

const CustomerRouter = express.Router();

CustomerRouter.route("/")
.get(filterCustomers)
CustomerRouter.route("/list")
.get(filterByFirstName);

function filterCustomers(req, res){
  const {car_make, gender, sort, limit, page} = req.query;

  let filteredCustomers = [...customers];

  if(car_make){
    filteredCustomers = filteredCustomers.filter((customer)=>{
      return car_make.toLowerCase() === customer.car_make.toLowerCase();
    })
  }

  
  if(gender){
    filteredCustomers = filteredCustomers.filter((customer)=>{
      return gender.toLowerCase() === customer.gender.toLowerCase();
    })
  }
  
  if(sort){
    const name = sort.split(":")[0];
    const sortOption = sort.split(":")[1];
    
    if(sortOption === "ASC"){
      filteredCustomers = filteredCustomers.sort((a, b)=>{
        if(name === "first_name"){
          return (a.first_name < b.first_name) ? -1: (a.first_name > b.first_name) ? 1: 0;
        }
        else if(name === "last_name"){
          return (a.last_name < b.last_name) ? -1: (a.last_name > b.last_name) ? 1: 0;
        }
      })
    }
    else if(sortOption === "DESC"){
      filteredCustomers = filteredCustomers.sort((a, b)=>{
        if(name === "first_name"){
          return (a.first_name > b.first_name) ? -1: (a.first_name < b.first_name) ? 1: 0;
        }
        else if(name === "last_name"){
          return (a.last_name > b.last_name) ? -1: (a.last_name < b.last_name) ? 1: 0;
        }
      })

    }
  }

  if(limit && page){
    filteredCustomers = filteredCustomers.slice((page - 1) * limit, page * limit);
  }

  res.status(200).json(filteredCustomers)
}

function filterByFirstName(req, res){
  const filter = req.query.filter;
  let filteredCustomers = [...customers];

  filteredCustomers = filteredCustomers.filter((customer)=>{
    return filter.toLowerCase() === customer.first_name.toLowerCase();
  })

  res.status(200).json(filteredCustomers);
}

module.exports = CustomerRouter;
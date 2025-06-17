import mongoose, { model } from "mongoose";
import express from "express";
import {Employee}  from './backend/model/empschema.js';
import cors from 'cors';
 let a = await mongoose.connect("mongodb://localhost:27017/employee")
 const app = express()
 const port = 3000
 
 app.use(cors())
 app.use(express.json())
 
    const randomname = () =>['kunal','harry','purvi','paresh','tuntunmausi'][Math.floor(Math.random()*5)]
    /* const randomno = () => [Math.random()* 8] */
    const ranlanguage = () => ['kannad','malayalyam','kutchi','gujurati','punjabi','marathi'][Math.floor(Math.random()*6)]
    const gendata = ()=>{
      const data=[];
      for (let i= 0;i<10;i++){
           data.push({
           name : randomname(),
           lang : ranlanguage(),
           id : Math.floor(Math.random()*40000)+ 200
           
           });
           
      }
        return data;
    };
    app.get("/", (req, res) => {
  res.send("Welcome to the Employee API! 🚀");
});



 app.post('/generate-data', async (req, res) => {
    try{
     await Employee.deleteMany({}); 
      const dummyData = gendata()
      const result = await Employee.insertMany(dummyData);
      res.status(200).json({message : "dummy data generated", records : result})
    }
    catch(error){
         res.status(500).json({ message: 'Error generating data', error });

    }
 })

 app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));

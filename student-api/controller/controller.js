const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class StudentController {

    async getAllData(req , res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(queries.getAllData)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getAllCourses(req , res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(queries.getAllCourses)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addStudent(req , res){
      console.log(req.body.enrolledCourses);
      try {
        if(req.body.name != null && req.body.enrolledCourses && req.body.enrolledCourses.length>0) {

        var coruses= req.body.enrolledCourses;
        var para ='VALUES';

       
         coruses.forEach(function (course) {
          if(course==coruses[coruses.length-1])
          {
            para=para+`(SCOPE_IDENTITY(),${course})`;
          }
          else{
            para=para+`(SCOPE_IDENTITY(),${course}),`;
          }

            });
           
            var finalquery = queries.addStudent + para;
           
          const pool = await poolPromise
          const result = await pool.request()
          .input('name',sql.VarChar , req.body.name)
          .input('del',sql.Bit , 0)
          .query(finalquery)
          res.json(result)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async addCourse(req , res){
      try {
        if(req.body.name != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('name',sql.VarChar , req.body.name)
          .input('del',sql.Bit , 0)
          .query(queries.addCourse)
          res.json(result)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async deleteStudent(req , res){
      try {
        debugger;
        console.log(req.body.id);
        if(req.body.id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.Int,req.body.id)
            .query(queries.deleteUser)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateData(req , res){
      try {
        console.log(req.body.id);
        if(req.body.id != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('id',sql.VarChar , req.body.id)
          .query(queries.updateUserDetails)
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new StudentController()
module.exports = controller;
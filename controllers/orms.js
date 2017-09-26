var Student = require("../models/Student.js");

module.exports = {

  //CREATE new Student
  addStudent: function(req, res){
    console.log("test");
    console.log(req.body);
    Student.create(req.body).then(function(doc){
      res.json(doc)}).catch(function(err){
        res.json(err);
      });
    },

  //READ all the Students
  showAllStudents: function(req, res){
    Student.find(function(err, students){
        if(err){
          res.status(500).send(err)
        } else {
          res.send(students);
        }
    });
  }

}// end of moduleExports

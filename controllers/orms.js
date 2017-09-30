var Student = require("../models/Student.js");
var Group = require("../models/Group.js");

module.exports = {

  //CREATE new Student
  addStudent: function(req, res){
    console.log("test");
    console.log(req.body);
    console.log("+++++++++++++");
    console.log(req.body._id);
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
  },

  editAStudent: function(req, res){
    console.log("test");

    Student.findOneAndUpdate({_id: req.body._id},
       {stuName: req.body.stuName,
        stuGradeLevel: req.body.stuGradeLevel,
        stuTier: req.body.stuTier}).then(function(doc){
          res.json(doc)}).catch(function(err){
            res.json(err);
          })
  }

}// end of moduleExports

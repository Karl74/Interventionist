var Student = require("../models/Student.js");
var Group = require("../models/Group.js");
var Evaluation = require("../models/Evaluation.js");
var Skills = require("../models/Skills.js");

module.exports = {
  //CREATE new Student
  addStudent: function(req, res){
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

    Student.findOneAndUpdate({_id: req.body._id},
       {stuName: req.body.stuName,
        stuGradeLevel: req.body.stuGradeLevel,
        stuTier: req.body.stuTier}).then(function(doc){
          res.json(doc)}).catch(function(err){
            res.json(err);
          });
  },

  addGroup: function(req, res){
    Group.create(req.body).then(function(doc){
      res.json(doc)}).catch(function(err){
        res.json(err);
      });
  },

  updateStudentTeam: function(req, res){
    Student.findOneAndUpdate({_id: req.body._id},
        {$addToSet: {stuGroups: req.body.stuGroups}}).then(function(doc){
          res.json(doc)}).catch(function(err){
            res.json(err);
          });
  },

  deleteStudentTeam: function(req, res){
    Student.findOneAndUpdate({_id: req.body._id},
        {$pull: {stuGroups: req.body.stuGroups}}).then(function(doc){
          res.json(doc)}).catch(function(err){
            res.json(err);
          });
  },

  showAllGroups: function(req, res){
    Group.find(function(err, students){
        if(err){
          res.status(500).send(err)
        } else {
          res.send(students);
        }
    });
  },

  pushStudentIds: function(req, res){
    Group.findOneAndUpdate({_id:req.body._id},
    {$addToSet:{groupStudents:req.body.studentId}}).then(function(doc){
      res.json(doc)}).catch(function(err){
        res.json(err);
      });
  },

  pullStudentIds: function(req, res){
    Group.findOneAndUpdate({_id:req.body._id},
    {$pull:{groupStudents:req.body.studentId}}).then(function(doc){
      res.json(doc)}).catch(function(err){
        res.json(err);
      });
    },

    //CREATE a new Evaluation.
    createNewEvaluation: function(req, res){
      Evaluation.create(req.body).then(function(doc){
        res.json(doc)}).catch(function(err){
          res.json(err);
        });
    },

    //READ all the Students
    showAllSkills: function(req, res){
      Skills.find(function(err, skills){
          if(err){
            res.status(500).send(err)
          } else {
            res.send(skills);
          }
      });
    }


}// end of moduleExports

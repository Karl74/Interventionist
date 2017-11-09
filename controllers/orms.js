var mongoose = require("mongoose");
var Student = require("../models/Student.js");
var Group = require("../models/Group.js");
var Evaluation = require("../models/Evaluation.js");
var Skills = require("../models/Skills.js");
var Lesson = require("../models/Lesson.js");

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

    //READ all the skills
    showAllSkills: function(req, res){
      Skills.find(function(err, skills){
          if(err){
            res.status(500).send(err)
          } else {
            res.send(skills);
          }
      });
    },

    // CREATE  a new skill
    createNewSkill: function(req, res){
      console.log(req.body);
      Skills.create(req.body).then(function(doc){
        res.json(doc)}).catch(function(err){
          res.json(err);
        });
    },

    //READ my skills only
    showMySkills: function(req, res){
      Skills.find({"mySkill":true}, function(err, skills){
        if(err){
          res.status(500).send(err)
        } else {
          res.send(skills);
        }
      });
    },
    //CREATE
    createNewLesson: function(req, res){
      Lesson.create(req.body).then(function(doc){
        res.json(doc)}).catch(function(err){
          res.json(err);
        });
    },

    FIRSTTRYOFpopulateTest: function(req, res){
      var name = req.params.name;
      console.log("this is "+ name);
      Student.find({stuName:name}).
      populate("Groups").exec(function(err, Student){
        if(err){
          console.log(err);
        } else {
          console.log(Students.StuGroups);
          return res.json(Student.StuGroups);
        }
      });
    },

    populateTest: function(req, res){
      var name = req.params.name;
      Student.find({stuName: name}, function(err, doc){
        if(err) {return res.send(err);}
        Student.populate(doc, {path:"stuGroups", select:"groupName"},function(err, response){
          if(err){return res.send(err);}
          console.log(doc);
          res.send(response);
        });
      })
    }

}// end of moduleExports

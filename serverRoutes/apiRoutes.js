var express = require("express");
var path = require("path");
var orms = require("../controllers/orms");

var router = new express.Router();

// | C | CREATE QUERIES ==========================================
//students.html ADD A STUDENT
  router.post("/lesson/newstudent", orms.addStudent);

// | R | READ QUERIES =============================================
  //get all the students in the collection
  router.get("/app/allthestudents", orms.showAllStudents);
// | U | UDATE QUERIES =============================================
  // Update the student info from student.html
  router.post("/lesson/updatestudent", orms.editAStudent);
// | D | DELETE QUERIES =============================================

// | N | NAVIGATION  +++++==========================================

  // 1 - Lesson.html
    router.get("/lesson", function(req, res){
      res.sendFile(path.join(__dirname, "../public/lesson.html"))
    });

  // 2 - Evaluations.html
    router.get("/evaluation", function(req, res){
      res.sendFile(path.join(__dirname, "../public/Evaluations.html"))
    });

  // 3 - reports.html
    router.get("/reports", function(req, res){
      res.sendFile(path.join(__dirname, "../public/index.html"))
    });

  // 4 - skills.html
    router.get("/skills", function(req, res){
      res.sendFile(path.join(__dirname, "../public/skills.html"))
    });

  // 5 - student.html
    router.get("/students", function(req, res){
      res.sendFile(path.join(__dirname, "../public/student.html"))
    });

  // 6 - teams.html
    router.get("/groups", function(req, res){
      res.sendFile(path.join(__dirname, "../public/teams.html"))
    });


module.exports = router;

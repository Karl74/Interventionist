var express = require("express");
var path = require("path");
var orms = require("../controllers/orms");

var router = new express.Router();

// | C | CREATE QUERIES ==========================================
//students.html ADD A STUDENT
  router.post("/lesson/newstudent", orms.addStudent);

//students.html ADD A STUDENT
  router.post("/groups/newgroup", orms.addGroup);


// | R | READ QUERIES =============================================

  //get all the students in the collection
    router.get("/app/allthestudents", orms.showAllStudents);

  // get all the groups in the collection
    router.get("/app/allGroups", orms.showAllGroups);

// | U | UDATE QUERIES =============================================

  // Update the student info from student.html
    router.post("/lesson/updatestudent", orms.editAStudent);

  //update the student group from group.html
    router.post("/group/updatestudent",orms.updateStudentTeam);

  // update the group schema with the student Id's from group.html
    router.post("/group/studentstoteam", orms.pushStudentIds);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// | D | DELETE QUERIES =============================================

  // deletes the team id from the student schema
    router.post("/group/deletestudentteam",orms.deleteStudentTeam);

  // delete the studentId from the group scheme

    router.post("/group/deletestudent", orms.pullStudentIds);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

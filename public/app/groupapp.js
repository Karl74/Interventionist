
// !=======================================================================!
// !                    FUNCTIONS FOR TEAMS.HTML                         !
// !==++===================================================================!

    var activeTeam = ["not assigned"];
// ==|f1|== MAKE A CARD VISIBLE
    // Call by: Event handler --> #createNewGroup
    //Parameters: the div hide element to turn visible

    function showASection(givenClass){
      givenClass.css("display", "block");
    }

// ==|f2|== HIDE A CARD
    // Call by: Event handler --> #createNewGroup
    //Parameters: the div element to be hidden

    function hideASection(givenClass){
      givenClass.css("display", "none");
    }

// ==|e1| == DISPLAY the "NEW GROUP CARD"
    // Call To:  showASection(), hideASection()
    //Parameters: .createAndEdit, #addStudentsButton, .createNewGroup

    $("#createNewGroup").on("click", function(){
      hideASection($(".createAndEdit"));
      showASection($("#addStudentsButton"));
      showASection($(".createNewGroup"));
      $("#groupName").val("");
      $("#teamGrade").val("");
      $("#tier").val("");
    });

// ==== PLAN ======
    // CREATE THE NEW TEAM DOCUMENT IN THE DB
    // OPEN THE CARD THAT HOLDS THE STUDENT PILLS
    // AJAX CALL FOR THE STUDENTS IN THE STUDENT COLLECTION THAT
    // DO NOT BELONG TO THE TEAM
    // DISPLAY THE STUDENT PILLS IN THE CARD
    //
    // AJAX CALL TO UPDATE THE TEAM DOCUMENT
    // AJAX CALL TO UPDATE THE STUDENT DOCUMENT
    // FUNCTION THAT RENDER THE SELECTED STUDENT INTO THE TEAM CARD
    // AJAX CALL TO REFRESH THE STUDENTS THAT DO NOT BELOG TO THE TEAM
    //
    // PLUS :
    //   MODIFY THE STUDENT SCHEMA


// ==|f3|== POST A NEW GROUP ON THE DB
    // Call by: Event handler --> #addStudentsButton
    //variables: Global activeTeam, Local: newGroupObject

  function createNewGroup(){
    var newGroupObject =  {
      groupName: $("#groupName").val(),
      groupGrade:$("#teamGrade").val(),
      groupTier: $("#tier").val(),
    }

    $.post("/api/groups/newgroup", newGroupObject, function(data){
      console.log(data)
      activeTeam.push(data._id);
      activeTeam.shift();
      console.log(activeTeam);
    });
  }

// == |f4| == RENDER the students Pills not included in a Team
    // Call By: Event handler --> #addStudentsButton
    // variables: Global activeTeam

  function getStudentsFromDb(){
    $(".stu-dis").empty();
    $.get("/api/app/allthestudents", function(data){
      console.log(data);
      for(i = 0; i < data.length; i++){
        studentPill(data[i].stuName, $("#notMembers"), data, i);
      };
    });
  }

// ==|f5|== Create a student pill
    // Call By: getStudentsFromDb()
    //Parameters: stuName, parent component, array index
    //variables : local pillStu
    //THIS FUNCTION IS USED ON STUDENT APP.JS WITH A DIFFRENT CLICK EVENT

  function studentPill(stuName, parent, data, i){
    var pillStu = $("<div>");
    pillStu.attr("class", "student-pill pill");
    pillStu.attr("id", stuName);
    pillStu.data("index", i);
    pillStu.html(stuName);
    parent.append(pillStu);

    pillStu.on("click", function(){
      updateStudentGroup(data, i , activeTeam);
    });
  }

  // ==|e1| == DISPLAY the "NEW GROUP CARD"
      // Call To:  showASection(), createNewGroup();
      //Parameters: .createAndEdit, #addStudentsButton, .createNewGroup

  $("#addStudentsButton").on("click", function(){
    createNewGroup();
    showASection($(".createAndEdit"));
    getStudentsFromDb();
  })

// ==|f6| == UPDATE the studentTeam on the database
  // Call By: Student Pill event handler
  // Parameters: grpup ObjectId

  function updateStudentGroup(data, i, groupId){
    var groupUpdate = {
      _id: data[i]._id,
      stuGroups: groupId
    };

    $.post("/api/group/updatestudent", groupUpdate, function(data){
      console.log(data);
    })

  }


// !=======================================================================!
// !                    FUNCTIONS FOR TEAMS.HTML                           !
// !==++===================================================================!

    var activeTeam = ["not assigned"];
    var studentsInGroup = [];

// ==|f1| == DISPLAY the existing group pills fro, the DB
// Call By: Loading and refresh page
// Parameters:

  function callGroupPills(){
    $.get("/api/app/allGroups", function(data){
      console.log(data);

      for(i = 0; i <data.length; i++){
      //CallBack: f2
        groupPill(data[i].groupName, $(".group-display"), data[i]._id);
      }
    });
  }

// ==|f2| == CREATE group pills
// Call By: callGroupPills()
// Parameters:name of the group, parent div and index

  function groupPill(groupName, parent, group_id){
    var pillGroup = $("<div>");
    pillGroup.attr("class", "group-pill pill");
    pillGroup.html(groupName);
    parent.append(pillGroup);

    // == |e1| ==  CHANGE the activeTeam
                // MAKE the "Student Pills Sections" visible
               // GET AND SORT the students pill
    // Call to: showASection(), getStudentsFromDb()
    pillGroup.on("click", function(){
      activeTeam.push(group_id);
      activeTeam.shift();
    //CallBack f3
      showASection($(".createAndEdit"));
      $(".groupNameCont").html(groupName);
    //CallBack f6
      getStudentsFromDb()
    })
  }

callGroupPills();

// ==|f3|== MAKE A CARD VISIBLE
    // Call by: Event handler --> #createNewGroup
    //Parameters: the div hide element to turn visible

    function showASection(givenClass){
      givenClass.css("display", "block");
    }

// ==|f4|== HIDE A CARD
    // Call by: Event handler --> #createNewGroup
    //Parameters: the div element to be hidden

    function hideASection(givenClass){
      givenClass.css("display", "none");
    }

// ==|e2| == DISPLAY the "NEW GROUP CARD"
    // Call To:  showASection(), hideASection()
    //Parameters: .createAndEdit, #addStudentsButton, .createNewGroup

    $("#createNewGroup").on("click", function(){
    //CallBack f4
      hideASection($(".createAndEdit"));
    //CallBack f3
      showASection($("#addStudentsButton"));
      showASection($(".createNewGroup"));
      $("#groupName").val("");
      $("#teamGrade").val("");
      $("#tier").val("");
    });

// ==|f5|== POST A NEW GROUP ON THE DB
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

// == |f6| == RENDER the students Pills not included in a Team
    // Call By: Event handler --> #addStudentsButton
    // variables: Global activeTeam
    // if one day something goes wrong is here!!!

  function getStudentsFromDb(){
    $(".stu-dis").empty();
    studentsInGroup = [];
    $.get("/api/app/allthestudents", function(data){
      console.log(data);
      $("#notMembers").empty();
      $("#members").empty();
      for(i = 0; i < data.length; i++){
        if(data[i].stuGroups.indexOf(activeTeam.toString()) == -1){
        //CallBack f7
          studentPill(data[i].stuName, $("#notMembers"), data, i, "notMember");
        } else {
          studentPill(data[i].stuName, $("#members"), data, i, "member" );
          studentsInGroup.push(data[i]._id);
        }
      };
      console.log(studentsInGroup);
    });
  }

// ==|f7|== CREATE a student pill.
    // Call By: getStudentsFromDb()
    //Parameters: stuName, parent component, array index
    //variables : local pillStu
    //THIS FUNCTION IS USED ON STUDENT APP.JS WITH A DIFFRENT CLICK EVENT

  function studentPill(stuName, parent, data, i, statusValue){
    var pillStu = $("<div>");
    pillStu.attr("class", "student-pill pill");
    pillStu.attr("id", stuName);
    pillStu.data("status", statusValue);
    // console.log(pillStu.data)
    pillStu.html(stuName);
    parent.append(pillStu);

    // == |e3| == UPDATE post the student data to the server
    pillStu.on("click", function(){
      console.log($(this).data("status"));
     if( $(this).data("status") == "notMember"){
       // CallBack: f8
       updateStudentGroup(data, i , activeTeam);
       studentsInGroup.push(data[i]._id);
       pushStudentIdToGroup(data[i]._id);
       console.log(studentsInGroup);
       // CallBack: f6
       getStudentsFromDb();
     } else {
       deleteStudentGroup(data, i, activeTeam);
       pullStudetFromGroup(data[i]._id);
       getStudentsFromDb();
     }
    });
  }

  // ==|e4| == DISPLAY the "NEW GROUP CARD"
      // Call To:  showASection(), createNewGroup();
      //Parameters: .createAndEdit, #addStudentsButton, .createNewGroup

  $("#addStudentsButton").on("click", function(){
  // CallBack f5
    createNewGroup();
  // CallBack f3
    showASection($(".createAndEdit"));
  // CallBack f6
    getStudentsFromDb();
  })

// ==|f8| == UPDATE the studentTeam on the database
  // Call By: Student Pill event handler (e3)
  // Parameters: group ObjectId, data = the list of the students, i

  function updateStudentGroup(data, i, groupId){
    var groupUpdate = {
      _id: data[i]._id,
      stuGroups: groupId
    };

    $.post("/api/group/updatestudent", groupUpdate, function(data){
      console.log(data);
    })
  }

// ==|f9| == DELETE the groupId from a student
    //Call By: Student Pill event handler (e3)
    // Parameters: group ObjectId, data = the list of the students, i

    function deleteStudentGroup(data, i, groupId){
      var groupUpdate = {
        _id: data[i]._id,
        stuGroups: groupId
      };

      $.post("/api/group/deletestudentteam", groupUpdate, function(data){
        console.log(data);
      })
    }

// == |f10| == POST  Add students Ids to the collection groups at the db
      // Call By: Student Pill event handler (e3)
      // variables: local updateGroupObject

    function pushStudentIdToGroup(studentId){
      var updateGroupObject = {_id: activeTeam, studentId: studentId};
      $.post("/api/group/studentstoteam",updateGroupObject, function(data){
        console.log(data);
      });
    };

// == |f11| == POST Delete student Id from the group collection.
        // Call By: Student Pill event handler (e3)
        // variables: Local updateGroupObject

    function pullStudetFromGroup(studentId){
      var updateGroupObject = {_id: activeTeam, studentId: studentId};
      $.post("/api/group/deletestudent", updateGroupObject, function(data){
        console.log(data);
      });
    }

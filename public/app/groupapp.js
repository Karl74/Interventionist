
// !=======================================================================!
// !                    FUNCTIONS FOR TEAMS.HTML                         !
// !==++===================================================================!

    var activeTeam = ["not assigned"];

// ==|f1| == DISPLAY the existen group pills
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
    // pillGroup.data("index", i);
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

  function getStudentsFromDb(){
    $(".stu-dis").empty();
    $.get("/api/app/allthestudents", function(data){
      console.log(data);
      $("#notMembers").empty();
      $("#members").empty();
      for(i = 0; i < data.length; i++){
        if(data[i].stuGroups.indexOf(activeTeam.toString()) == -1){
        //CallBack f7
          studentPill(data[i].stuName, $("#notMembers"), data, i, "notMembers");
        } else {
          studentPill(data[i].stuName, $("#members"), data, i, "member" );
        }
      };
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
    // CallBack: f8
    console.log($(this).data("status"));
      updateStudentGroup(data, i , activeTeam);
      getStudentsFromDb()
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

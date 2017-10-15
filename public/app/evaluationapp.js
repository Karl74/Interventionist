// !=======================================================================!
// !                    FUNCTIONS FOR EVALUATION.HTML                           !
// !==++===================================================================!

  var activeTeam = ["not assigned"];

  var evaluationGrades = [{name:"empty", grade:"empty"}];

  var evaluationObject = {
    evaluationName: "",
    evaluationDate: "",
    groupEvaluated:"",
    evaluationGrades:[]
  }

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
    // Call to: showASection() f3, getStudentsFromDb()
    pillGroup.on("click", function(){
      activeTeam.push(group_id);
      activeTeam.shift();
      $("#teamName").html(groupName);
    //CallBack f3
      showASection($(".preset"));
      $(".groupNameCont").html(groupName);
    //CallBack f6
      getStudentsFromDb();
    })
  }

callGroupPills();

// ==|f3|== MAKE A CARD VISIBLE
    // Call by: Event handler --> #createNewGroup
    //Parameters: the div hide element to turn visible

  function showASection(givenClass){
    givenClass.css("display", "block");
  };

// == |e2|== DISPLAYS the record box with the evalution info and
// push ito the evaluation object.
      // Calls to: showASection () f3

  $("#newEvaluationBtn").on("click", function(){
    event.preventDefault();
    $("#displayEvName").html($("#evName").val());
    evaluationObject.evaluationName = $("#evName").val();
    $("#displayEvDate").html("&nbsp" + $("#evDate").val());
    showASection($(".recordBox"));
  });

// == |f4| == RENDER the students Pills  included in a Team
    // Call By: Event handler --> #newEvaluationBtn
    // variables: Global activeTeam

  function getStudentsFromDb(){
    $.get("/api/app/allthestudents", function(data){
      console.log(data);
      $("#evalTable").empty();
      for(i = 0; i <data.length; i++){
        if(data[i].stuGroups.indexOf(activeTeam.toString())== -1){
          var doNoting = true;
        } else {
          console.log(data[i].stuName);
          createStudentRow(data[i].stuName, data[i]._id);
        }
      };
    });
  };

// == |f5| == Creates the individual container for each student controller
  //Call by: function getStudentsFromDb
  // callBack: createStudentPill(), createGradeControls()

  function createStudentRow(stuName, stuId){
      //L-256
    var studentRow = $("<div>");
    studentRow.attr("class", "studentControl");
    createStudentPill(studentRow, stuName, stuId);
    // createGradeControls(studentRow);

    $("#evalTable").append(studentRow);
  };

//==|f6| == CREATES a student pill
  // Call by: f5 createStudentRow
  // Parameters: appendIn, stuName, stuId

  createStudentPill = function(appendIn, stuName, stuId){
    // ATRIBUTES: none.
    // F: Creates oval button with grade value.
    var studPill = $("<div>");
    studPill.html(stuName);
    studPill.attr("class", "student-pill pill");
    studPill.data("id", stuId);
    appendIn.append(studPill);
  };

//==|f7| == CREATES grade controls
    // Call by: f5 createStudentRow()
    // Parameters: appendInn, 

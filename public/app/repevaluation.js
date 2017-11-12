// !=======================================================================!
// !                    FUNCTIONS FOR EVALUATION.HTML                           !
// !==++===================================================================!

  var activeTeam = "not assigned";

  var evaluationGrades = [{studentId:"empty", grade:"empty"}];

  var evaluationObject = {
    evaluationName: "",
    evaluationDate: "",
    groupEvaluated: activeTeam,
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
console.log("hey this is working")
  function groupPill(groupName, parent, group_id){
    var pillGroup = $("<div>");
    pillGroup.attr("class", "group-pill pill");
    pillGroup.html(groupName);
    parent.append(pillGroup);

    // == |e1| ==  CHANGE the activeTeam
                // MAKE
               // GET AND SORT t
    // Call to: showASection() f3, getEvaluations() f4,
    pillGroup.on("click", function(){
      activeTeam = group_id;
      evaluationObject.groupEvaluated = group_id;
      $("#teamName").html(groupName);
    //CallBack f3
      showASection($(".preset"));
    //CallBack f6
      getEvaluations(group_id);
      $(".stu-dis").empty();
      $("#evalTable").empty();
    });
  }

callGroupPills();

// ==|f3|== MAKE A CARD VISIBLE
  // Call by: Event handler --> #createNewGroup,
  //Parameters: the div hide element to turn visible

function showASection(givenClass){
  givenClass.css("display", "block");
};

//==|f4|== GET Evaluations data for the called group.
  //Call by: Evant hanfler --> pillGroup
  //CallBack: displayEval()f5

  function getEvaluations(groupId){
    $.get("/api/app/evaluation/"+groupId, function(data){
      console.log(data);
      for(i=0; i<data.length; i++){
        createEvaPill(data[i].evaluationName, data[i]._id, $(".stu-dis"));
      }
    })
  }

//==|f5| CREATE Evaluation Pill
    //Call by: getEvaluation()f4

    function createEvaPill(evalName, evalId, parent){
      var evalPill = $("<div>");
      evalPill.attr("class", "skill-pill pill");
      evalPill.attr("id", evalId); //this might not be necesary
      evalPill.html(evalName);
      parent.append(evalPill);

      // == |e2| ==  CALL the evaluation report
      // Call to:
      evalPill.on("click", function(){
        getEvaluationById(evalId);
        $("#evalTable").empty();
        showASection($(".recordBox"));
      })
    }

//==|f6|== GET Evaluations for required id.
  //Call by: Evant hanfler --> pillGroup
  //CallBack: displayEval()f5

  function getEvaluationById(_id){
    console.log(_id);
    $.get("/api/app/evaluationbyid/"+_id, function(data){
      console.log("================================");
      console.log(data[0].evaluationGrades);
      // console.log(data[0].evaluationGrades[0].studentId.stuName);
      // console.log(data[0].evaluationGrades[0].studentId.stuName);
      for(i=0; i<data[0].evaluationGrades.length; i++){
        createDataRow(
          data[0].evaluationGrades[i].studentId.stuName,
          data[0].evaluationGrades[i].grade
        );
      }
    });
  }

//==|f7|== DISPLAY student evaluation result
    // Cal by: getEvaluationById() f6

    function createDataRow(stuName, evGrade){
      var dataRow = $("<div>");
      dataRow.attr("class", "dataRow");
      $("#evalTable").append(dataRow);

      var name = $("<h5>");
      name.html(stuName);
      dataRow.append(name);

      var grade = $("<div>");
      grade.html(evGrade);
      dataRow.append(grade);
    }

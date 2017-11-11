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
    });
  }

callGroupPills();

// ==|f3|== MAKE A CARD VISIBLE
  // Call by: Event handler --> #createNewGroup
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
    })
  }

//==|f5| CREATE Evaluation Pill
    //Call by: getEvaluation()f4

    function createEvaPill(evalName, evalId, parent){
      var evalPill = $("<div>");
      evalPill.attr("class", "skill-pill pill");
      evalPill.attr("id", evalId);
      evalPill.html(evalName);
      parent.append(evalPill);
    }

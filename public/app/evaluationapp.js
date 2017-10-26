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

  function groupPill(groupName, parent, group_id){
    var pillGroup = $("<div>");
    pillGroup.attr("class", "group-pill pill");
    pillGroup.html(groupName);
    parent.append(pillGroup);

    // == |e1| ==  CHANGE the activeTeam
                // MAKE the "Student Pills Sections" visible
               // GET AND SORT the students pill
    // Call to: showASection() f3, getStudentsFromDb() f4,
    pillGroup.on("click", function(){
      activeTeam = group_id;
      evaluationObject.groupEvaluated = group_id;
      $("#teamName").html(groupName);
    //CallBack f3
      showASection($(".preset"));
    //CallBack f6
      getStudentsFromDb();
    });
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
    $("#displayEvDate").html($("#evDate").val());
    evaluationObject.evaluationDate = $("#evDate").val();
    showASection($(".recordBox"));
  });

// == |f4| == GET the all the students in the database
    // Call By: Event handler --> Group Pill e1
    // CallBack: pickGroupMembers(data) f5

  function getStudentsFromDb(){
    arrayOfData = [];
        //==>call data
    $.get("/api/app/allthestudents", function(data){
      console.log(data);
      $("#evalTable").empty();
      pickGroupMembers(data);
    });
  }

// == |f5| == FILTER the students included in the active team
    // Call By: pickGroupMembers(data) f5
    // CallBack: createStudentObj(arrayOfData) f7
    // variables: arrayOfData

  arrayOfData = [];
  function pickGroupMembers(data){
    for(i = 0; i <data.length; i++){
      if(data[i].stuGroups.indexOf(activeTeam.toString())== -1){
        var doNoting = true;
      } else {
        console.log(data[i].stuName);
        arrayOfData.push({id:data[i]._id, name:data[i].stuName});
      }
    };
    createStudentObj(arrayOfData);
  };

// == |f6| == CONSTRUCTOR Students
    // Call By: createStudentObj() f7

  function Student(name, id){
    this.name = name;
    this.id = id;

    this.createStudentRow = function(){
    //==|f9|== CREATE the divs to append students controls
      // CallBy: external function .......... COMPLETE THIS COMMENT
      // CallBack: this.createStudentPill() and this.createGradeControls
      var studentRow = $("<div>");
      studentRow.attr("class", "studentControl");
      this.createStudentPill(studentRow);
      this.createGradeControls(studentRow);
      $("#evalTable").append(studentRow);
    };

    this.createStudentPill = function(appendIn){
    // ==|f10|== CREATE the studens pills
      // CallBy: this.createStudentRow()
      var studPill = $("<div>");
      studPill.html(this.name);
      studPill.attr("class", "student-pill pill");
      appendIn.append(studPill);
    };

    this.createGradeControls = function(place){
    //==|f11|== CREATES the control container and append it.
      // Call By: this.createStudentRow()
      // CallBack: this.createOvalPills()
      var controlContainer = $("<div>");
      controlContainer.attr("class", "assignGrades");
      place.append(controlContainer);

      var inputText = $("<input>");
      inputText.val("");
      controlContainer.append(inputText);

      this.createOvalPills("50/F", 50, controlContainer, inputText);
      this.createOvalPills("60/F", 60, controlContainer, inputText);
      this.createOvalPills("70/F", 70, controlContainer, inputText);
      this.createOvalPills("80/F", 80, controlContainer, inputText);
      this.createOvalPills("90/F", 90, controlContainer, inputText);
      this.createOvalPills("100/F", 100, controlContainer, inputText);
    };

    this.createOvalPills = function(label, value, place, field){
    //==|f12|== CREATES  each ovalbutton with grade value.
      // Call By: this.createGradeControls();
      var ovalPill = $("<div>");
      ovalPill.html(label);
      ovalPill.attr("class", "input-pill ovalPill");
      ovalPill.data("value", value);
      place.append(ovalPill);

      var that = this.id;
      var thefunction = this.recordGrade;

    //==|e3|== INPUTS the grade value in the text box and the gradesObject
      // CallBack: this.recordGrade()
      ovalPill.on("click", function(){
      console.log($(this).data("value"));
      field.val($(this).data("value"));
      thefunction(that, $(this).data("value"));
      console.log(evaluationGrades);
      });
    };

    this.recordGrade = function(studentId, grade){
    //==|f13|== WRITES OR UPDATES the student's grade
      // Call By: ovalPill event handler
      // Variables: GLOBAL evaluationGrades
      var recorded = true;

      for(i = 0; i < evaluationGrades.length; i++){
        if(evaluationGrades[i].studentId === studentId){
          console.log("already recorded");
          evaluationGrades.splice(i,1,{studentId:studentId, grade:grade});
          recorded = true;
          break;
        } else {
          recorded = false;
          console.log("is not recorded");
        }
      }
      if(recorded === false){
        evaluationGrades.push({studentId:studentId, grade:grade});
      }
    };

  };// end studentObject

// == |f7| == CONSTRUCTS the student's objects
    // Call By: pickGroupMembers() f5
    // CallBack: Student(name, id) f6, renderStudents(f8)
    // variables: students

  function createStudentObj(arrayOfData){
    var students = arrayOfData.map(function (array){
     return new Student(array.name, array.id);
    });
    renderStudents(students);
  };

// == |f8| == DISPLAYS students controlls for evaluation
  // Call By: createStudentObj() f7
  // CallBack: student[e].createStudentRow()

  function renderStudents(students){
    for(e=0; e<students.length; e++){
      console.log("the student " + e + " is" + students[e].name);
      students[e].createStudentRow();
    };
  };

// == |f14| == POST The evaluation object into the db
  // Call By: Submit button event handler e4

  function postEvaluation(){
    $.post("/api/evaluation/newevaluation", evaluationObject, function(data){
      console.log(data);
    });
  }

// == |e4| == POST the evaluation object into the db
  // CallBack:

  $("#submitBtn").on("click", function(){
    event.preventDefault();
    console.log("hey");
    evaluationGrades.shift();
    evaluationObject.evaluationGrades = evaluationGrades;
    console.log(evaluationObject);
    postEvaluation();
  });

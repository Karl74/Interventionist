  $(document).ready(function() {
  console.log("It's alive!!!!!");
  var activeTeam = "not assigned";

//  == | A | FUNCTIONS ==================================
  //  == | A.1 | FUNCTIONS for students.html==================
  // Make modal visible
    function openModal(){
      $(".modal-screen").css("display", "block");
    }

  // close modal (make it invisible) --------------------
    function closeModal(){
      $(".modal-screen").css("display", "none");
    }

  // Parameters. html element to expand. Expand a child -------------------------------------
          //   change the status at the buttonbar
          //   change the bar class
          //   change the display of the child
    function expandChild(bar) {
      bar.data("status", "expanded");
      bar.attr("class", "childExpanded");
      bar.parent().next().css("display", "block");
      bar.children().attr("class", "glyphicon glyphicon-minus");
    }
  // Parameters. html element to cpmtracts. Contracts a child ---------------------------------------------
    function contractChild(bar) {
      bar.data("status", "contracted");
      bar.attr("class", "window-title expander");
      bar.parent().next().css("display", "none");
      bar.children().attr("class", "glyphicon glyphicon-plus");
    }

  // Params: ??????  creates an student yellow pill ------------------------------
    function studentPill(stuName, parent, i){
      var pillStu = $("<div>");
      pillStu.attr("class", "student-pill pill");
      pillStu.attr("id", stuName);
      pillStu.data("index", i);
      pillStu.html(stuName);
      parent.append(pillStu);
    }

    // Create the find student object and the ajax call
      function findStudent(){
        var find = {stuName: $("#findStuName").val()}
        console.log(find);
      }
    // create the new student object and the ajax call
      function addNewStudent(){
        var newStudent = {
          stuName: $("#stuIdNew").val(),
          stuId: $("#stuNameNew").val(),
          stuGrade: $("#stuGradeNew").val(),
          stuTier: $("#stuTierNew").val(),
          stuTeam: $("#stuTeamNew").val()
        }
        console.log(newStudent);
      }

    // create the edit student object and the ajax call
        function updateStudent(){
          var editStudent = {
            stuName: $("#stuIdEdit").val(),
            stuId: $("#stuNameEdit").val(),
            stuGrade: $("#stuGradeEdit").val(),
            stuTier: $("#stuTierEdit").val(),
            stuTeam: $("#stuTeamEdit").val()
          }
          console.log(editStudent);
        }

    // pass the student data to the edit form
    function fillEditBox(index){
      $("#stuIdEdit").val(students[index].id);
      $("#stuNameEdit").val(students[index].name);
      $("#stuGradeEdit").val(students[index].grade);
      $("#stuTierEdit").val(students[index].tier);
      $("#stuTeamEdit").val(students[index].team);
    }

//  == | A.2 | FUNCTIONS for teams.html==================
  var newGroupObject = {
    groupName:"",
    groupGrade:"",
    groupTier:"",
    groupStudents: []
  }

  // Displays all the groups pills inside a div
    function groupPill(groupName, parent, i){
      var pillGroup = $("<div>");
      pillGroup.attr("class", "group-pill pill");
      pillGroup.data("index", i);
      pillGroup.html(groupName);
      parent.append(pillGroup);
    }
    // Makes visible a section under a given class
    function showASection(givenClass){
      givenClass.css("display", "block");
    }

    function hideASection(givenClass){
      givenClass.css("display", "none");
    }
// Params $.(this) clicked pill. -Hides the students pill displays. -Gets the name,
// grade and tier of the selected team. -Displays inside the imput elements.
    function setActiveTeam(pill){
      hideASection($("#addStudentsButton"));
      $("#groupName").val(teams[pill.data("index")].name);
      $("#teamGrade").val(teams[pill.data("index")].grade);
      $("#tier").val(teams[pill.data("index")].tier);
    }

    //GET AL THE STUDENT NAMES INIDE THE NEW TEAM STUDENT BOX
    function listMembers(){
      newGroupObject.groupStudents = [];
      for(i=0; i<$("#members").children().length; i++){
        newGroupObject.groupStudents.push($("#members").children()[i].id);
      }
    }

    function populateGroupObject(){
      newGroupObject.groupName = $("#groupName").val();
      newGroupObject.groupGrade= $("#teamGrade").val();
      newGroupObject.groupTier= $("#tier").val();
    }

//  == | A.3 | FUNCTIONS for evaluations.html==================

// == | B | DATA FUNCTIONS =====================

  // Set the student object and display =======================
  // Inlue of ajax call
    var data = [
    	{name:"Marcela", id:7701, grade:5, tier:2, team:"Fifth B"},
    	{name:"Mariana", id:7904, grade:7, tier:2, team:"Fifth B"},
    	{name:"Claribel", id:7101, grade:3, tier:2, team:"Fourth A"},
      {name:"Carlitos", id:7201, grade:1, tier:2, team:"Fifth B"},
      {name:"Sonic", id:7301, grade:"k", tier:2, team:"Fourth A"},
      {name:"Pepe", id:7401, grade:"k", tier:2, team:"Fourth A"},
      {name:"Toño", id:7501, grade:"k", tier:2, team:"Fourth A"},
      {name:"Concha", id:7601, grade:"k", tier:2, team:"Fourth B"},
      {name:"Pablito", id:7691, grade:"k", tier:2, team:"Fifth A"}
    	];

// STUDENT OBJECT CONSTRUCTOR
    function Student(name, id, grade, tier, team){
    	this.name = name;
    	this.id = id;
    	this.grade = grade;
    	this.team = team;
      this.tier = tier;
    	this.performance = "";
    	this.counter = 2;
      this.evalGrade = 0;
      // this.studPill = $("<div>");
      this.gradeToDisplay = "";
      this.assignedGrade = "nr";

      this.addCounter = function(){
        //ATRIBUTES: none.
        //f: increase variable counter by 1
    		return this.counter += 1;
    	};

      this.subsCounter = function(){
        return this.counter +-1;
      };

      this.createStudentPill = function(appendIn){
        // ATRIBUTES: none.
        // F: Creates oval button with grade value.
        var studPill = $("<div>");
        studPill.html(this.name);
        studPill.attr("class", "student-pill pill");
        appendIn.append(studPill);
      };

      this.createOvalPills = function(name, value, place, field){
        // ATRIBUTES: name and value of the oval pill container.
        // F: Creates oval button with grade value.
        var ovalPill = $("<div>");
        ovalPill.html(name);
        ovalPill.attr("class", "input-pill ovalPill");
        ovalPill.data("value", value);
        place.append(ovalPill);

        that = this.evalGrade;

        ovalPill.on("click", function(){
          console.log("hello dude");
          console.log($(this).data("value"));
          field.val($(this).data("value"));
          that = 60;
          console.log(that);

        });
      };

      this.createGradeControls = function(place){
          //Create the control container and append it.
          var controlContainer = $("<div>");
          controlContainer.attr("class", "assignGrades");
          place.append(controlContainer);

          //create the imput variable with full features
          var inputText = $("<input>");
          inputText.val("");
          controlContainer.append(inputText);
          //create the oval pill with calling function
          this.createOvalPills("50/F", 50, controlContainer, inputText);
          this.createOvalPills("60/F", 60, controlContainer, inputText);
          this.createOvalPills("70/F", 70, controlContainer, inputText);
          this.createOvalPills("80/F", 80, controlContainer, inputText);
          this.createOvalPills("90/F", 90, controlContainer, inputText);
          this.createOvalPills("100/F", 100, controlContainer, inputText);
      };


      this.createStudentRow = function(){
        var studentRow = $("<div>");
        studentRow.attr("class", "studentControl");
        this.createStudentPill(studentRow);
        this.createGradeControls(studentRow);
        // this.createGradeControls(studentRow);
        $("#evalTable").append(studentRow);

      };


    } // end of constructor
    // Here a new array is creating with the method map and the constructor
      var students = data.map(function (array){
	     return new Student(array.name, array.id, array.grade, array.tier, array.team);
      });


  // Sets the event handler for student pills for each html file
      switch ($("body").data("file")) {
        case "student":
              console.log("this is the student file");
              for(i = 0; i < students.length; i++){
                studentPill(students[i].name, $(".stu-dis"), i);
              }
          break;
        case "teams":
            console.log("this is the team file");
            // for(i = 0; i < students.length; i++){
            //   if(students[i].team !== activeTeam){
            //     studentPill(students[i].name, $(".stu-dis"), i);
            //   }
            // }
          break;
      }

// ===== | B.1 | TEAMS DATA FUNCTIONS =====================================
    // inlue of ajax call
    var teams = [
      {name: "Fifth A" , grade:5 ,tier:2},
      {name: "Fifth B" , grade:5 ,tier:3},
      {name: "Fourth A" , grade:4 ,tier:2},
      {name: "Fourth B" , grade:4 ,tier:3}
    ];

// COMMON LOOP Creates the groups for teams.htlm, lessons.html and  evaluations.html
    for(i = 0; i <teams.length; i++){
      groupPill(teams[i].name, $(".group-display"), i);
    }

  // Display students that do not belong to the activeTeam
  function excludedFromActiveTeam(){
    for(i = 0; i < students.length; i++){
      if(students[i].team !== activeTeam){
        studentPill(students[i].name, $(".allStu-dis"), i);
      }
    }
  }

  // Display all students pills that belongs to the activeTeam
  function includedOnActiveTeam(){
    for(i = 0; i < students.length; i++){
      if(students[i].team == activeTeam){
        studentPill(students[i].name, $(".teamStu-dis"), i);
      }
    }
        // EVENT. STUDENTPILL. Moves the pill to a different container
        $(".student-pill").on("click", function(){
          moveStudentToGroup($(this));
          // $(".teamStu-dis").append($(this));
        });
  }
  // Clear the student pill display from previous groups
    function clearStudentsPills(){
      $(".allStu-dis").empty();
      $(".teamStu-dis").empty();
    }

  // Moves the student pill between active team box and all students box
    function moveStudentToGroup(pill){
      if(pill.data("included")){
        pill.data("included", false);
        $("#notMembers").append(pill);
        console.log("is  a member now");
      } else {
        console.log("is not even here");
        $("#members").append(pill);
        pill.data("included", true);
        }
    }
// ===== | B.2 | Evaluation.html DATA FUNCTIONS ============================
    // Parameters $(this) --> the clicked pill.
      // Displays the team name at the evaluation title.
      // Displays the current date at the input box.()
      function setTeamToEvaluate(pill){
          $("#teamName").html(teams[pill.data("index")].name);
          var date = new Date();
          $("#evDate").val(date.toDateString());
            activeTeam = "empty"
          $("#evalTable").empty();
          $(".studentControl").remove();
          //student control is a variable. is the value is colled twice it keeps ths old children

      }

      // Parameters |-name of the group (pill) |-students data(ajax)
      // creates an array with the student object for each member of the group
      function callGroupStudents(pill){
        $("#evalTable").empty();
        activeTeam = teams[pill.data("index")].name;
        console.log("this is the active team" + activeTeam);

        for (i = 0; i < students.length; i++){
          if(students[i].team == activeTeam){
            console.log(students[i].name + " is here");
            console.log(students[i]);
            students[i].createStudentRow();
          }
        }
      }

// == | C | EVENT HANDLERS  ==================================
  // == | C.1 | EVENT HANDLERS for Student.html ==================================

  // Blue large buttons. Expands or contracts divs whith pills---------------------
    $(".headBar").on("click", function() {
      if ($(event.target).data("status") == "contracted") {
        expandChild($(event.target));
      } else if ($(event.target).data("status") == "expanded") {
        contractChild($(event.target));
      }
    });
  // New student button. Send the new student info to the database
    $("#newStudentButton").on("click", function(){
      event.preventDefault();
      addNewStudent();
      $(".form-control").val("");
      alert("the new student was saved")
    });
    $("#editStudentButton").on("click", function(){
      event.preventDefault();
      updateStudent();
      $(".form-control").val("");
      // hides the edit form
      $("#editStudent").css("display", "none");
      alert("changes were made")
    });

  // Modal x and cancel buttons. Close the modal ---------------------------------
    $(".closeM").on("click", function(){
        closeModal();
    });

  // Find pill. Opens the serch modal -----------------------------
    $("#findStudentPill").on("click", function(){
      $(".form-control").val("");
      openModal();
    });

    // FIND BUTTON (on modal) runs findStudent()
      $("#findStudentButton").on("click", function(){
        findStudent();
        closeModal();
        $("#editStudent").css("display", "block");
      });

      // STUDENT-PILL FUNCTION(on student.html). spreads student data inside the edit box
      // STUDENT-PILL FUNCTION(on teams.html). pending
      // STUDENT-PILL FUNCTION(on lesson.html). pending
      $(".student-pill").on("click", function(){
        if($("body").data("file") == "student"){
          $("#editStudent").css("display", "block");
          fillEditBox($(this).data("index"));
        } else//($("body").data("file") == "teams")
        {
          // activeTeam = $("#groupName").val();
          console.log("no event asssigned");
        }
      });

// == | C.2 | EVENT HANDLERS for teams.html ==================================
    // NEW GROUP PILL. Displays the new group form
      $("#createNewGroup").on("click", function(){
        hideASection($(".createAndEdit"));
        showASection($("#addStudentsButton"));
        showASection($(".createNewGroup"));
        $("#groupName").val("");
        $("#teamGrade").val("");
        $("#tier").val("");
      });
  // ADD STUDENT BUTTON ON NEW STUDENT FORM. Display the boxes with the students pills
      $("#addStudentsButton").on("click", function(){
        clearStudentsPills()
        showASection($(".createAndEdit"));
        activeTeam = $("#groupName").val();
        console.log(activeTeam);
        excludedFromActiveTeam();
        includedOnActiveTeam();
      });

    // GROUP PILL. Display student pill boxes and forms
      $(".group-pill").on("click", function(){
        switch ($("body").data("file")) {
          case "teams":
            clearStudentsPills()
            showASection($(".createNewGroup"));
            showASection($(".createAndEdit"));
            setActiveTeam($(this));
            activeTeam = $("#groupName").val();
            console.log(activeTeam);
            excludedFromActiveTeam();
            includedOnActiveTeam();
          break;

          case "evaluations":
          setTeamToEvaluate($(this));
          callGroupStudents($(this));
          //create the students pills and controls
          // create the evalution object
        }
      })

    // SAVE CHANGES BUTTON. Saves the group or ner group settings
    $("#saveGroup").on("click", function(){
      listMembers();
      populateGroupObject();
      console.log(newGroupObject);
    });

  // == | C.3 | EVENT HANDLERS for Evaluation.html ==================================

    //START NEW EVALUATION BUTTON.
          // Writes the evaluation name and date on the boxheader

    $("#newEvaluationBtn").on("click", function(){
      event.preventDefault();
      $("#displayEvName").html($("#evName").val());
      $("#displayEvDate").html("&nbsp" + $("#evDate").val());
    });

    $("#submitBtn").on("click", function(){
      event.preventDefault();
      console.log("hey");
      for(i = 0; i < students.length; i++){
        console.log(students[i].name + students[i].evalGrade);
      }

    })




});  // End of document get ready

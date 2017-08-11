$(document).ready(function() {
  console.log("It's alive!!!!!");

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

  // Expand a child -------------------------------------
          //   change the status at the buttonbar
          //   change the bar class
          //   change the display of the child
    function expandChild(bar) {
      bar.data("status", "expanded");
      bar.attr("class", "childExpanded");
      bar.parent().next().css("display", "block");
      bar.children().attr("class", "glyphicon glyphicon-minus");
    }
  // Expand a child ---------------------------------------------
    function contractChild(bar) {
      bar.data("status", "contracted");
      bar.attr("class", "window-title expander");
      bar.parent().next().css("display", "none");
      bar.children().attr("class", "glyphicon glyphicon-plus");
    }

  // creates an student yellow pill ------------------------------
    function studentPill(stuName, parent, i){
      var pillStu = $("<div>");
      pillStu.attr("class", "student-pill pill");
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

//  == | A.1 | FUNCTIONS for teams.html==================
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

// == | B | DATA FUNCTIONS =====================

  // Set the student object and display =======================
  // Inlue of ajax call
    var data = [
    	{name:"Marcela", id:7701, grade:5, tier:2, team:"NotAsigned" },
    	{name:"Mariana", id:7904, grade:7, tier:2, team:"NotAsigned" },
    	{name:"Claribel", id:7101, grade:3, tier:2, team:"Patotas" },
      {name:"Carlitos", id:7201, grade:1, tier:2, team:"NotAsigned"},
      {name:"Sonic", id:7301, grade:"k", tier:2, team:"NotAsigned"}
    	];

    function Student(name, id, grade, tier, team){
    	this.name = name;
    	this.id = id;
    	this.grade = grade;
    	this.team = team;
      this.tier = tier;
    	this.performance = "";
    	this.counter = 2;
    	this.addCounter = function(){
    		return this.counter += 1;
      	};
      this.subsCounter = function(){
        return this.counter +-1;
        }
    }
    // Here a new array is creating with the method map and the constructor
      var students = data.map(function (array){
	     return new Student(array.name, array.id, array.grade, array.tier, array.team);
      });

      var activeTeam = "not assigned";
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

// ===== | B.1 | TEAMS DATA FUNCTIONS
    // inlue of ajax call
    var teams = [
      {name: "Fifth A" , grade:5 ,tier:2},
      {name: "Fifth B" , grade:5 ,tier:2},
      {name: "Fourth A" , grade:5 ,tier:2},
      {name: "Fourth B" , grade:5 ,tier:2}
    ];

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

  // Display students belongs to the activeTeam
  function includedOnActiveTeam(){
    for(i = 0; i < students.length; i++){
      if(students[i].team == activeTeam){
        studentPill(students[i].name, $(".teamStu-dis"), i);
      }
    }
    $(".student-pill").on("click", function(){
      updateStudentGroup($(this).data("index"));
      $(".teamStu-dis").append($(this));
    });
  }
  // Clear the student pill display from previous groups
    function clearStudentsPills(){
      $(".allStu-dis").empty();
      $(".teamStu-dis").empty();
    }

  // Add or update the group of the student
    function updateStudentGroup(index){
      console.log(index);
      students[index].team = activeTeam;
      console.log(students[index]);

    }

// == | C | EVENT HANDLERS  ==================================
  // == | C | EVENT HANDLERS for Student.html ==================================

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
          console.log("hello");
        }
      });

  // == | C | EVENT HANDLERS for teams.html ==================================
      $("#createNewGroup").on("click", function(){
        showASection($(".createNewGroup"));
      });

      $("#addStudentsButton").on("click", function(){
        clearStudentsPills()
        showASection($(".createAndEdit"));
        activeTeam = $("#groupName").val();
        console.log(activeTeam);
        excludedFromActiveTeam();
        includedOnActiveTeam();
      });




});  // End of document get ready

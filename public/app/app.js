$(document).ready(function() {
  console.log("It's alive!!!!!");
// == | A | EVENT HANDLERS for Student.html ==================================
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
  // Change Student Button. Send the updated information of the student to the database
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
    $(".find-pill").on("click", function(){
      openModal();
    });

    // Find button on modal runs findStudent()
      $("#findStudentButton").on("click", function(){
        findStudent();
        closeModal();
        $("#editStudent").css("display", "block");
      });

//  == | B | FUNCTIONS ==================================
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

// == | C | DATA FUNCTIONS =====================

// Set the student object and display =======================
    var data = [
    	{name:"Marcela", id:7701, grade:5, tier:2, team:"" },
    	{name:"Mariana", id:7904, grade:7, tier:2, team:"" },
    	{name:"Claribel", id:7101, grade:3, tier:2, team:"Patotas" },
      {name:"Carlitos", id:7201, grade:1, tier:2, team:""},
      {name:"Sonic", id:7301, grade:"k", tier:2, team:""}
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
    // Create the pills for each student in the object
      for(i = 0; i < students.length; i++){
        studentPill(students[i].name, $(".stu-dis"), i);
      }
    // Add
      $(".student-pill").on("click", function(){
        $("#editStudent").css("display", "block");
        fillEditBox($(this).data("index"));
      });


});  // End of document get ready

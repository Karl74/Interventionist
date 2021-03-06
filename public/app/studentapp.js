
// !=======================================================================!
// !                    FUNCTIONS FOR STUDENT.HTML                         !
// !==++===================================================================!

// ==|f1|== MAKE A CARD VISIBLE UNDER A BAR BUTTON (blue bar with + sign)
    // Call by: Event handler --> .headBar
    //Parameters: $(event.target)

  function expandChild(bar) {
    bar.data("status", "expanded");
    bar.attr("class", "childExpanded");
    bar.parent().next().css("display", "block");
    bar.children().attr("class", "glyphicon glyphicon-minus");
  }

// ==|f2|== HIDE A CARD  THAT IS UNDER A BAR BUTTON (blue bar with + sign)
      // Call by: Event handler --> .headBar
      //Parameters: $(event.target)

  function contractChild(bar) {
    bar.data("status", "contracted");
    bar.attr("class", "window-title expander");
    bar.parent().next().css("display", "none");
    bar.children().attr("class", "glyphicon glyphicon-plus");
  }

// ==|e1|== HIDE OR SHOW A CARD THAT IS UNDER A BAR BUTTON (blue bar with + sign)
      // Call To:  expandChild(), contractChild()
      //Parameters: $(event.target)

  $(".headBar").on("click", function() {
    if ($(event.target).data("status") == "contracted") {
      expandChild($(event.target));
    } else if ($(event.target).data("status") == "expanded") {
      contractChild($(event.target));
    }
  });

// ==|f3|== Post a new student from the button new
    // Call By: Event Handler -->
    //Parameters: $(event.target)
    //variables : local newStudent

  function addNewStudent(){
    var newStudent = {
      _id: $("#stuIdNew").val(),
      stuName: $("#stuNameNew").val(),
      stuGradeLevel: $("#stuGradeNew").val(),
      stuTier: $("#stuTierNew").val(),
      // stuTeam: $("#stuTeamNew").val()
    }
    console.log(newStudent);
    $.post("/api/lesson/newstudent", newStudent, function(data){
      console.log(data);
    })
  }

// ==|e2|== Post a new student from the button new
      // Call to: addNewStudent()

  $("#newStudentButton").on("click", function(){
    event.preventDefault();
    addNewStudent();
    $(".form-control").val("");
    alert("the new student was saved")
  });

// ==|f4|== GET the students from the database
    // Call By: Event Handler --> EDIT STUDENT BAR
    // callBack: StudentPill();
    //Parameters:
    //variables :

  function getStudentsFromDb(){
    $(".stu-dis").empty();
    $.get("/api/app/allthestudents", function(data){
      console.log(data);
      for(i = 0; i < data.length; i++){
        studentPill(data[i].stuName, $(".stu-dis"), data, i);
      };
    });
  }

// ==|f5|== Create a student pill
    // Call By: getStudentsFromDb()
    //Parameters: stuName, parent component, array index
    //variables : local pillStu

  function studentPill(stuName, parent, data, i){
    var pillStu = $("<div>");
    pillStu.attr("class", "student-pill pill");
    pillStu.attr("id", stuName);
    pillStu.data("index", i);
    pillStu.html(stuName);
    parent.append(pillStu);

    pillStu.on("click", function(){
      fillEditBox(data, i);
    });
  }
// ==|e3|== GET the students from the database
      // Call to: callStudentsFrom Db()

  $("#editStuBar").on("click", function(){
    getStudentsFromDb();
  });


// ==|f6|== Write Student data into the "Edit Student Card"
    // Call By: Event Handler --> Student Pill
    // Parameters: index of the array item "data"

  function fillEditBox(data, index){
    $("#editStudent").css("display", "block");

    $("#stuIdEdit").val(data[index]._id);
    $("#stuNameEdit").val(data[index].stuName);
    $("#stuGradeEdit").val(data[index].stuGradeLevel);
    $("#stuTierEdit").val(data[index].stuTier);
  }

// ==|f7|== POST Update the student info from the "Edit Student Card"
    // Call By: Event Handler --> #editStudentButton
    // Variables: Local editStudent

  function updateStudent(){
    var editStudent = {
      _id: $("#stuIdEdit").val(),
      stuName: $("#stuNameEdit").val(),
      stuGradeLevel: $("#stuGradeEdit").val(),
      stuTier: $("#stuTierEdit").val(),
    }
    console.log(editStudent);

    $.post("/api/lesson/updatestudent", editStudent, function(data){
      console.log(data);
    });
  }

  // ==|e4|== Update the student info from the "Edit Student Card"
      // Call To: updateStudent()

    $("#editStudentButton").on("click", function(){
      event.preventDefault();
      updateStudent();
      getStudentsFromDb();
    });


// CLEAN THE STUDENT PILL DISPLAY BOX AFTER UPDATE

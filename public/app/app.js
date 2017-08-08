$(document).ready(function() {
  console.log("It's alive!!!!!");
// == | A | EVENT HANDLERS ==================================
  $(".headBar").on("click", function() {
    if ($(event.target).data("status") == "contracted") {
      expandChild($(event.target));
    } else if ($(event.target).data("status") == "expanded") {
      contractChild($(event.target));
    }
  });

  $(".closeM").on("click", function(){
      closeModal();
  });

  $(".find-pill").on("click", function(){
    openModal();
  });
  // Make modal visible
  function openModal(){
    $(".modal-screen").css("display", "block");
  }

  // close modal (make it invisible)
  function closeModal(){
    $(".modal-screen").css("display", "none");
  }


  // Expand a child
  //   change the status at the buttonbar
  //   change the bar class
  //   change the display of the child
  function expandChild(bar) {
    bar.data("status", "expanded");
    bar.attr("class", "childExpanded");
    bar.parent().next().css("display", "block");
    bar.children().attr("class", "glyphicon glyphicon-minus");
  }
// Expand a child
  function contractChild(bar) {
    bar.data("status", "contracted");
    bar.attr("class", "window-title expander");
    bar.parent().next().css("display", "none");
    bar.children().attr("class", "glyphicon glyphicon-plus");
  }

// creates an student yellow pill
  function studentPill(stuName, parent){
    var pillStu = $("<div>");
    pillStu.attr("class", "student-pill pill");
    pillStu.html(stuName);
    parent.append(pillStu);
  }

// studentPill("Marcela", $(".stu-dis"));

var team = ["Marcelita", "Mariana", "Claribel", "Carlitos", "sonic"]
for(i = 0; i < team.length; i++){
  studentPill(team[i], $(".stu-dis"));
}

}); //End of document get ready
// var studentApp = {

// function to display the "Edit form section"
// function to close the "Edit Student section"
// Event handler for student pill

// function that form the new student object
// function that post the new student object
// Event handler for New student

// function to get all the students in the database
// function to create a single student pill
// function to render a student pill for each student in the database

//funtion to display a find student modal
// function to get the find a student object from the modal
// function to send the request object the query object from modal
// Event handler for type pill
// function to close the modal
//function to display the response object inside the edit student form-box

// handler event for the student pill
// function to request the data of the student name
//function to display the response object inside the edit student form-box (duplicated)

// function to create the edit object to request (post)
// function to post the edit student info
// function to inform the user that the student info was updated
// handler event for change button

// }

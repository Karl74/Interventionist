
// !=======================================================================!
// !                    FUNCTIONS FOR TEAMS.HTML                         !
// !==++===================================================================!

// ==|f1|== MAKE A CARD VISIBLE
    // Call by: Event handler --> #createNewGroup
    //Parameters: the div hide element to turn visible

    function showASection(givenClass){
      givenClass.css("display", "block");
    }

// ==|f2|== HIDE A CARD
    // Call by: Event handler --> #createNewGroup
    //Parameters: the div element to be hidden

    function hideASection(givenClass){
      givenClass.css("display", "none");
    }

// ==|e1| == DISPLAY the "NEW GROUP CARD"
    // Call To:  showASection(), hideASection()
    //Parameters: .createAndEdit, #addStudentsButton, .createNewGroup

    $("#createNewGroup").on("click", function(){
      hideASection($(".createAndEdit"));
      showASection($("#addStudentsButton"));
      showASection($(".createNewGroup"));
      $("#groupName").val("");
      $("#teamGrade").val("");
      $("#tier").val("");
    });

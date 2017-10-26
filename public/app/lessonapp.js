// !=======================================================================!
// !                    FUNCTIONS FOR LESSON.HTML                           !
// !==++===================================================================!

var activeTeam = "not assigned";

var lessonRecordedPerformace = [{StudentId:"empty", performance:"empty"}];

var lessonObject = {
  lessonSkill: "",
  lessonDate: "",
  lessonGroup: activeTeam,
  lessonGrades:[],
  lessonNotes:[],
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
    // Call to: showASection(), getStudentsFromDb()
    pillGroup.on("click", function(){
      activeTeam = group_id;
      lessonObject.lessonGroup = group_id;
      $("#teamName").html(groupName);
    //CallBack f3
      showASection($(".preset"));
      // $(".groupNameCont").html(groupName);
    //CallBack f6
      getStudentsFromDb();
    });
  }

callGroupPills();

// ==|f3|== MAKE A CARD VISIBLE
    // Call by: Event handler --> #createNewGroup
    //Parameters: t he div hide element to turn visible

  function showASection(givenClass){
    givenClass.css("display", "block");
  };

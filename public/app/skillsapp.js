// !=======================================================================!
// !                    FUNCTIONS FOR EVALUATION.HTML                           !
// !==++===================================================================!

// Plan
// get the data
    // ajax funvtion
    // calls the sort function(data)

//sort the data()
    // if data is xxa
        //   create pills(data, xxa);
        // else
        //     create pills (data, xxb);

//create the pills()
    // create the pill
    // on click
      // transform function(pillinfo)

// transform the pills

// == |f1|== GET   All the skills in the database
  //Call By: app
  //CallBack: sortSkills()

  function getSkills(){
    $.get("/api/app/allskills", function(data){
      console.log(data);
      callDefaultSkills(data);
    });
  }

getSkills();

// == |f2|== PRE-SORT  the skills into custom and default skills
  // Call by: getSkills() f1
  // CallBack: crete pill

  function callDefaultSkills(data){
    $("#laBox").empty();
    $("#mathBox").empty();
    $("#mySkillsBox").empty();
    for(i=0; i<data.length; i++){
      switch (data[i].skillOrigin) {
        case "preload":
          sortAndDisplaySkills(data[i].skillName, data[i].skillSubject);
          break;
        case "custom":
          createSkillPill(data[i].skillName, $("#mySkillsBox"));
          break;
      };
    }
  }

// == |f3| == SORT and DISPLAY skills by subject
  // Call by: callDefaulSkills() f2
  // CallBack:

  function sortAndDisplaySkills(skillName, subject){
    switch (subject) {
      case "Language Arts":
        console.log (skillName + "is a LA skill");
        createSkillPill(skillName, $("#laBox"))
        break;
      case "Math":
        console.log(skillName + "is a Math skill");
        createSkillPill(skillName, $("#mathBox"));
    };
  }

// == |f4| == CREATE a skill pill
  // Call By: sortAndDisplaySkills() f3, displayMySkills() f4,

  function createSkillPill(skillName, parent){
    var pillSkill = $("<div>");
    pillSkill.attr("class", "skill-pill pill");
    pillSkill.attr("id", skillName);
    pillSkill.html(skillName);
    parent.append(pillSkill);
  }

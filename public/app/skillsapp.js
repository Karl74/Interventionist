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
  // CallBack: sortAndDisplaySkills()f3, createSkillPill()f4

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
          createSkillPill(data[i].skillName, $("#mySkillsBox"), data[i].skillSubject);
          break;
      };
    }
  }

// == |f3| == SORT and DISPLAY skills by subject
  // Call by: callDefaultSkills() f2
  // CallBack: createSkillPill()f4

  function sortAndDisplaySkills(skillName, subject){
    switch (subject) {
      case "Language Arts":
        createSkillPill(skillName, $("#laBox"), subject)
        break;
      case "Math":
        createSkillPill(skillName, $("#mathBox"), subject);
    };
  }

// == |f4| == CREATE a skill pill
  // Call By: sortAndDisplaySkills() f3, displayMySkills() f4,
  // Call Back:

  function createSkillPill(skillName, parent, subject){
    var pillSkill = $("<div>");
    pillSkill.attr("class", "skill-pill pill");
    pillSkill.attr("id", skillName);
    pillSkill.data("subject", subject)
    pillSkill.html(skillName);
    parent.append(pillSkill);

    // == |e1| == ADD this skill to mySkills
    pillSkill.on("click", function(){
      createANewSkill(skillName, subject);
      getSkills();
    });
  }

// == |f5| ==  Create a new custom skill
  // Call by:

  function createANewSkill(skillName, skillSubject){
    var newSkillObject ={
      skillName:skillName,
      skillSubject: skillSubject,
      skillOrigin:"custom",
      mySkill: true
    }
    $.post("/api/skills/newSkill", newSkillObject,function(data){
      console.log("added");
    });
  }

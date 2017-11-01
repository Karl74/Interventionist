// !=======================================================================!
// !                    FUNCTIONS FOR LESSON.HTML                           !
// !==++===================================================================!

var activeTeam = "not assigned";

var lessonRecordedPerformace = [{StudentId:"empty", performance:"empty"}];

var lessonObject = {
  lessonSkill: "",
  lessonDate: new Date(),
  lessonGroup: activeTeam,
  lessonGrades:[],
  // lessonNotes:[],
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
      getMyskills()
    });
  }

callGroupPills();

// ==|f3|== MAKE A CARD VISIBLE
    // Call by: Event handler --> PillGroup, e1
                // Event hadler --> skillPill, e2
    //Parameters: the div hide element to turn visible

  function showASection(givenClass){
    givenClass.css("display", "block");
  };

//== |f4| == GET my skills from db
    // Call By: Event handler --> PillGroup
    // CallBack: create skillPills();

  function getMyskills(){
    $.get("/api/app/myskills", function(data){
      console.log(data);
      $(".lessonSkillBox").empty();
      callSkillPills(data);
    })
  }

// == |f6| == CREATES the skill Pills for each skill in myskills
  // Call by: getMyskills()f4
  // CallBack: createSkillPill() f6

  function callSkillPills(data){
    for(i=0; i<data.length; i++){
      createSkillPill(data[i].skillName, $(".lessonSkillBox"));
    }
  }

// == |f7| == CREATES and APPENDS skill Pills
  // Call by: getMyskills()f4

  function createSkillPill(label, appendIn){
      var skillPill = $("<div>");
      skillPill.attr("class", " pill skill-pill");
      skillPill.html(label);
      appendIn.append(skillPill);
      // == |e2| == MAKE the "Student Pills Sections" visible
      //            HIDES the skillPill section
      // Call to: showASection()f3, hideASection()f8

      skillPill.on("click", function(){
        showASection($(".recordBox"));
        hideASection($(".preset"));
        $("#displayLessonSkill").html(label);
        lessonObject.lessonSkill = label;
        console.log(label);
        getStudentsFromDb();
      });
    }

// == |f8| == HIDES sections from the html document
  //Call By: Event handler --> Skillpill,  e2

  function hideASection(givenClass){
    givenClass.css("display", "none");
  }

// == |f9| == GET the all the students in the database
    // Call By: Event handler --> Group Pill e1
    // CallBack: pickGroupMembers(data) f5

  function getStudentsFromDb(){
    $.get("/api/app/allthestudents", function(data){
      console.log(data);
      $("#evalTable").empty();
      pickGroupMembers(data);
    });
  }

// == |f10| == FILTER the students included in the active team
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

// == |f11| == CONSTRUCTOR students
  // Call By: createStudentObj()f12
  function Student(name, id, grade, tier, team){
    this.name = name;
    this.id = id;
    this.tallyCounter = 0;

    this.createStudentPill = function(appendIn){
    //==|f14|==CREATES each studentPill
    // Call by: createStudentControl()f15
      var studPill = $("<div>");
      studPill.html(this.name);
      studPill.attr("class", "student-pill pill");
      appendIn.append(studPill);
    };

    this.createLessonTools = function(){
      //==|f15|== CREATES the div for display the individual student controls
      // Call by: ??????????????/  AJAX CALL ??????/
      // CallBack: this.createStudentControl() f??
      //          this.createBoxContainer() f??
      var allRecordTools = $("<div>");
      allRecordTools.attr("class", "allRecordTools");
      this.createStudentControl(allRecordTools);
      this.createBoxContainer(allRecordTools);

      $("#evalTable").append(allRecordTools);
    };

    this.createStudentControl= function(appenIn){
      //==|f16|== CREATES the div for display  student controls
      // Call by: createLessonTools() f14
      // CallBack: this.createStudentPill() f13
      //          this.createLessonControls() f16
      var studentControl = $("<div>");
      studentControl.attr("class", "studentControl");
      this.createStudentPill(studentControl);
      this.createLessonControls(studentControl);
      appenIn.append(studentControl);
    };

    this.createLessonControls= function(appenIn){
      //==|f17|== CREATES the div for the tally counters and boxes
      // Call by: createStudentControl() f15
      // CallBack: this.createCounter() f17
      //           this.createPerformaceBox() f18
      //           this.createButtonNoteButton()f21
      var counter = $("<div>");
      counter.attr("class", "counter");
      this.createCounter(counter);
      this.createPerformaceBox(counter);
      this.createButtonNoteButton(counter);
      appenIn.append(counter);
    };

    this.createCounter = function(appenIn){
      //==|f18|== CREATES all the tally counter controlls
      // Call by: createLessonControls() f16
      var countDisplay = $("<input>");
      countDisplay.attr("class", "count-display");

      var positiveCount = $("<div>");
      positiveCount.attr("class", "input-pill ovalPill positive");
      positiveCount.html("+")

      var negativeCount = $("<div>");
      negativeCount.attr("class", "input-pill ovalPill negative");
      negativeCount.html("-")

      appenIn.append(positiveCount);
      appenIn.append(negativeCount);
      appenIn.append(countDisplay);

      tallyCounter = this.tallyCounter;
      positiveCount.on("click", function(){
        tallyCounter += 1;
        countDisplay.val(tallyCounter);
      });

      negativeCount.on("click", function(){
        tallyCounter -= 1;
        countDisplay.val(tallyCounter);
      });
    };

    this.createPerformaceBox = function(appenIn){
      //==|f19|== CREATES the div for the performance controlls
      // Call by: createLessonControls() f16
      // CallBack: this.performanceControls()f20
      var performanceDisplay = $("<div>");
      performanceDisplay.attr("class", "counter");
      this.performanceControls(performanceDisplay);
      appenIn.append(performanceDisplay);
    };

    this.createPerformancePill = function(label, appenIn, field){
      //==|f20|== Create the performace pills
      // Call by: this.performanceControls()f20
      var performancePill = $("<div>");
      performancePill.html(label);
      performancePill.attr("class", "input-pill ovalPill");
      appenIn.append(performancePill);

      var thisName = this.name;
      var recordFunction = this.recordPerformance;

      $(performancePill).on("click", function(){
        console.log(label);
        field.val(label);
        recordFunction(thisName, label);
        console.log(lessonRecordedPerformace);
      });

    };

    this.performanceControls = function(appenIn){
      //==|f21|== RENDERS the performace pills for: onlevel, above and under
      // Call by:createPerformaceBox
      //CallBack:this.createPerformancePill()f19
      var inputPerformance = $("<input>")
      inputPerformance.attr("class", "performace-display");
      this.createPerformancePill("under", appenIn, inputPerformance);
      this.createPerformancePill("meets", appenIn, inputPerformance);
      this.createPerformancePill("above", appenIn, inputPerformance);
      appenIn.append(inputPerformance);
    };

    this.createButtonNoteButton = function(appenIn){
      //==|f22|== CREATES the button for open the notes field
      //Call by: this.createLessonControls()f18
      var noteButton = $("<button>");
      noteButton.attr("class", "btn btn-primary");
      noteButton.html("Notes");
      appenIn.append(noteButton);
    };

    this.createBoxContainer = function(appenIn){
      //==|f23|== CREATES the div to locate the notes field
      //Call by: this.createLessonControls()f14
      //CallBack: this.createNoteBox()f23
      var noteDiv = $("<div>");
      noteDiv.attr("class", "noteHidden");
      this.createNoteBox(noteDiv);
      appenIn.append(noteDiv);
    };

    this.createNoteBox = function(appenIn){
      //==|f24|== CREATES the notes field
      //Call by: this.createBoxContainer()f22
        var noteBox = $("<textarea>");
        noteBox.attr({rows: "2", cols: "83"});

        var closeNote = $("<button>");
        closeNote.attr("class", "btn btn-primary");
        closeNote.html("Close");

        appenIn.append([noteBox, closeNote]);
    };

    this.recordPerformance = function(name, performance){
      //==|f25|== WRITES the records for the lesson for each individual student
      //Call by: Event handler --> performace Pill
      var recorded = true;

      for(i = 0; i < lessonRecordedPerformace.length; i++){
        if(lessonRecordedPerformace[i].name === name){
          console.log("already recorded");
          lessonRecordedPerformace.splice(i,1,{name: name, performance: performance});
          recorded = true;
          break;
        } else {
          recorded = false;
          console.log("is not recorded");
        }
      }
      if(recorded === false){
        lessonRecordedPerformace.push({name:name, performace: performance});
      }
    };
  }; // end of constructor

// == |f12| == CONSTRUCTS the student's objects
    // Call By: pickGroupMembers() f5
    // CallBack: Student(name, id) f6, renderStudents(f8)
    // variables: students

  function createStudentObj(arrayOfData){
    var students = arrayOfData.map(function (array){
     return new Student(array.name, array.id);
    });
    renderStudents(students);
  };

// == |f13| == DISPLAYS students controlls for evaluation
  // Call By: createStudentObj() f7
  // CallBack: student[e].createStudentRow()

  function renderStudents(students){
    for(e=0; e<students.length; e++){
      console.log("the student " + e + " is" + students[e].name);
      students[e].createLessonTools();
    };
  };

// == |f26| == POST The lesson object into the db
  // Call By: Submit button event handler e4

  function postLesson(){
    $.post("/api/lesson/newlesson", evaluationObject, function(data){
      console.log(data);
    });
  }

  // == |e4| == POST the lesson object into the db
    // CallBack: postLesson()

$("#submitLesson").on("click", function(){
  event.preventDefault();
  lessonRecordedPerformace.shift();
  lessonObject.lessonGrades = lessonRecordedPerformace;
  console.log(lessonObject);
  postLesson();
});

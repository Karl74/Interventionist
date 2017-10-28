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
  });
}

getSkills();

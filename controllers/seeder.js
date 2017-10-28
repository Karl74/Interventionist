var Skills = require("../models/Skills.js");

module.exports = {
  seedSkills: function(){
    console.log("request from cli");
    var skillSeeds = [
      {skillName:"Central Idea",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName:"Cause and Effect",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName:" Recall facts and details",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName:"Comparing and contrasting",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName:"Sequence",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName:"inferencing",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName:"Word meaning in context",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName:"Author's Purpose",
       skillSubject:"Language Arts",
      skillOrigin:"preload",
      mySkill:false},

      {skillName:"Figurative Language",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName: "Summarizing",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

      {skillName: "Fact and opinions",
       skillSubject:"Language Arts",
       skillOrigin:"preload",
       mySkill:false},

       {skillName: "compare magnitude",
        skillSubject:"Math",
        skillOrigin:"preload",
        mySkill:false},

      {skillName: "Complete a sequence",
       skillSubject:"Math",
       skillOrigin:"preload",
       mySkill:false},

      {skillName: "Identify the verb",
       skillSubject:"Language Arts",
       skillOrigin:"custom",
       mySkill:true}
    ];

    for(i=0; i < skillSeeds.length; i++){
      Skills.create(skillSeeds[i]);
    };
  }
}

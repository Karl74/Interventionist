var Skills = require("../models/Skills.js");

module.exports = {
  seedSkills: function(){
    console.log("request from cli");
    var skillSeeds = [
      {skillName:"Central Idea", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:"Cause and Eff ect", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:" Recall facts and details", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:"Comparing and contrasting", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:"Sequence", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:"inferencing", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:"Word meaning in context", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:"Author's Purpose", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName:"Figurative Language", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName: "Summarizing", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false},
      {skillName: "Fact and opinions", skillSubject:"Language Arts", SkillOrigin:"preload", mySkill:false}
    ];

    for(i=0; i < skillSeeds.length; i++){
      Skills.create(skillSeeds[i]);
    }
  }
}

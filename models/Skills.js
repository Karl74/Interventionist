var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var skillSchema = new Schema({
  skillName:{type:String, required:true, unique: true},

  skillSubject: {type: String},

  skillOrigin:{type:String},

  mySkill:{type:Boolean}
});

var Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;

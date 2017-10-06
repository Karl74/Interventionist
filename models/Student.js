var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  // teacherId:{type: Schema.Types.ObjectId, ref: "Teacher"},

  _id:{type:String, required:true, unique: true},

  stuName: {type: String, required: true},

  stuGradeLevel:{type: String, required: true},

  stuTier:{type: Number},

  stuGroups: [{type:Schema.Types.ObjectId, ref: "Group"}]
});

var Student = mongoose.model("Student", studentSchema);
module.exports = Student;

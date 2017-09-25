var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  teacher:{type: Schema.Types.ObjectId, ref: "Teacher"},

  _id:{type:String, required:true, unique: true},

  studentName: {type: String, required: true},

  gradeLevel:{type: String, required: true},

  tier:{type: Number}
});

var Student = mongoose.model("Student", studentSchema);
module.exports = Student;

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var evaluationSchema = new Schema({
  evaluationDate: Date,
  evaluationName: String,
  groupEvaluated:{type:Schema.Types.ObjectId, ref: "Group"},
  evaluationGrades:[
    {
      studentId:{type: Schema.Types.String, ref: "Student"},
      grade: Number
    }
  ]
});

var Evaluation = mongoose.model("Evaluation", evaluationSchema);
module.exports = Evaluation;

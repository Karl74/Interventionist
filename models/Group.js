var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var groupSchema = new Schema ({

  groupName: String,

  groupGrade: String,

  groupTier: Number,

  groupStudents: [{type: Schema.Types.String, ref: "Student"}]
});

var Group = mongoose.model("Group", groupSchema);
module.exports = Group;

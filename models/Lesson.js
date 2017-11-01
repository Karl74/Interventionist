var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var lessonSchema = new Schema({
lessonDate: Date,
lessonSkill: String,
lessonGroup: {type: Schema.Types.ObjectId, ref: "Group"},
lessonGrades:[{studentId:{type: Schema.Types.String, ref:"Student"},
               performance: String
             }
            ]
});

var Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;

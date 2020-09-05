var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const ResponseSchema = new Schema({
	keyName: { type: String },
	keyValue: { type: String },
	createdAt:  { type: Date },
	countsItem:  { type: [Number] }
  }, {
	timestamps: true,
  });

const Model = mongoose.model
const ResponseRecords = Model('records',ResponseSchema)
module.exports = ResponseRecords;
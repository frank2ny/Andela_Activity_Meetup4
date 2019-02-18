const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  datecreated: { type: String, required: true },
  dateupdated: { type: String, required: true },

});

module.exports = mongoose.model('Note', notesSchema);
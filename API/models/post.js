'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = schema({
  description: String,
  file: String,
  created_at: String,
  user: { type: schema.ObjectId, ref: 'User' }


});


module.exports = mongoose.model('Post', postSchema);
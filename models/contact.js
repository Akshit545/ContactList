const mongoose = require('mongoose');

//schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

//collection name
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
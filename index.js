const express = require('express');//include library of express
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();//fire express using app

app.set('view engine', 'ejs');//setting ejs as viewer(MVC)
app.set('views', path.join(__dirname, 'views'));//setting path of ejs file
app.use(express.urlencoded());//reads only the phone parameters
app.use(express.static('assets'));//setting static folder for ejs files

app.get('/', function (req, res) {

  Contact.find({}, function (err, contacts) {

    if (err) {
      console.log('error in fetching contacts');
      return;
    }
    return res.render('home', {
      title: "Contact list",
      contact_list: contacts
    });
  });

});

app.post('/create-contact', function (req, res) {

  Contact.create({
    name: req.body.name,
    number: req.body.number
  }, function (err, newContact) {
    if (err) {
      console.log('error in creating contact', err)
      return;
    }
    console.log('**********', newContact);
    return res.redirect('back');
  });
});

app.get('/delete-contact/', function (req, res) {
  // get id from query in the url
  let id = req.query.id;
  // find contact in db using id and delete
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log('error in deleting an object');
      return;
    }
    return res.redirect('back');
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running the server', err);
  }
  console.log('Server running on port', port);
});
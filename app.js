var express = require('express');

var mongoose = require('mongoose');
var preston = require('preston');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017');
var Todo = mongoose.model('Todo', new mongoose.Schema({
  title: String,
  completed: Boolean
}));

var app = express();

app.use(express.static('client/'));

app.use(require('body-parser').json());
preston(Todo);
app.use('/api', preston.middleware());
preston.printRoutes();

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('App listening on port ' + port);
});

var express = require('Express');
var file = express();

var things = require('./file');

file.use('/file.js', things);

file.listen(9000);
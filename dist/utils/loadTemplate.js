var fs = require('fs');
var ejs = require('ejs');

function loadTemplate(file) {
  var ejsString = fs.readFileSync(file, 'utf8');
  return function (data) {
    return ejs.render(ejsString, data);
  };
}

module.exports = loadTemplate;
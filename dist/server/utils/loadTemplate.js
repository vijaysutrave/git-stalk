import fs from 'fs';
import ejs from 'ejs';

function loadTemplate(file) {
  var ejsString = fs.readFileSync(file, 'utf8');
  return function (data) {
    return ejs.render(ejsString, data);
  };
}

export { loadTemplate };
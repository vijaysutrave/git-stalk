import fs from 'fs';
import ejs from 'ejs';

function loadTemplate (file){
  const ejsString = fs.readFileSync(file, 'utf8');
  return (data) => {
    return ejs.render(ejsString, data);
  }
}


export {loadTemplate};

const fs =  require('fs');
const ejs =  require('ejs');

function loadTemplate (file){
  const ejsString = fs.readFileSync(file, 'utf8');
  return (data) => {
    return ejs.render(ejsString, data);
  }
}


module.exports = loadTemplate;

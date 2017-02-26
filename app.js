'use strict';
require("babel-register");

// Require hook to ignore less includes
function ignoreRequire(extension) {
  require.extensions[extension] = function(m, filename) {
    return;
  };
}

// ignore scss, css requires
ignoreRequire('.scss');
ignoreRequire('.css');

//set the deployment node environment if devserver
// if(process.env.NODE_ENV === "devserver") {
//   process.env.DEPLOYMENT_NODE = __dirname.split('/').pop();
// }

// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const serverPath =   './server';

const server = require(serverPath);

server();

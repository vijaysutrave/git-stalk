'use strict';
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {match, RouterContext} = require('react-router');
const {Provider} = require('react-redux');
const loadTemplate = require('./dist/utils/loadTemplate');
const Routes = require('./dist/common/routes');

const port = 8050;
const Store = require('./dist/common/store');
const store = Store.store;
const path = require('path');
const app = express();

app.use('/dist', express.static('./dist'))


const baseTemplate = loadTemplate(path.join(__dirname, './js/server/views/index.ejs'))

function server() {
  app.use((req, res) => {
    match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const body = ReactDOMServer.renderToString(
            React.createElement(Provider, {store},
              React.createElement(RouterContext, renderProps)
            )
          );

            const template = baseTemplate({
              body 
            });

            res.status(200).send(template)
        // res.status(200).send(baseTemplate({ body }))
      } else {
        res.status(404).send('Not found')
      }
    })
  })

  console.log('listening on port ' + port)
  app.listen(port)
}

module.exports = server;
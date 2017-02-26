const Layout = require('./Layout')

if (typeof(require.ensure) !== "function") {
  require.ensure = function(modules, callback) {
    callback(require);
  }
}


const Routes = {
  component: Layout,
  path: '/',
  indexRoute: {
    getComponent (location, cb) {
      require.ensure([], () => {
        cb(null, require('./Layout'))
      })
    }
  },
  childRoutes: [
  ]
}

module.exports = Routes;
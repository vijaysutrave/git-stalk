const Layout = require('./Layout')

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

module.exports = Routes

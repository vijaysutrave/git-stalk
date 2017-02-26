var Layout = require('./Layout');

if (typeof require.ensure !== "function") {
  require.ensure = function (modules, callback) {
    callback(require);
  };
}

var Routes = {
  component: Layout,
  path: '/',
  indexRoute: {
    getComponent: function getComponent(location, cb) {
      require.ensure([], function () {
        cb(null, require('./Layout'));
      });
    }
  },
  childRoutes: []
};

module.exports = Routes;
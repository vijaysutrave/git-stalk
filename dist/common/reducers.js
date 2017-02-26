export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
  var action = arguments[1];

  switch (action.type) {
    case 'FETCH_BOOKS_SUCCESS':
      return action.repos;
    default:
      return state;
  }
});
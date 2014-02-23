require('basis.data');
require('app.list');

module.exports = new app.list.List({
  header: 'Featured components',
  childNodes: basis.data.wrap(require('./data.json'))
});

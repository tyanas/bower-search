require('basis.data');
require('basis.data.dataset');
require('app.list');

var last50Modules = new basis.data.dataset.Slice({
  source: require('app.modules').withDescription,
  limit: 50,
  orderDesc: true,
  rule: 'data.created'
});
var hotModules = new basis.data.dataset.Slice({
  source: last50Modules,
  orderDesc: true,
  limit: 5,
  rule: 'data.stars'
});

module.exports = new app.list.List({
  header: 'Hot components',
  dataSource: hotModules,
  sorting: 'data.stars',
  sortingDesc: true
});

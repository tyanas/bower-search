var Slice = require('basis.data.dataset').Slice;
var List = require('app.list').List;

var last50Modules = new Slice({
  source: require('app.modules').withDescription,
  limit: 50,
  orderDesc: true,
  rule: 'data.created'
});
var hotModules = new Slice({
  source: last50Modules,
  orderDesc: true,
  limit: 5,
  rule: 'data.stars'
});

module.exports = new List({
  header: 'Hot components',
  dataSource: hotModules,
  sorting: 'data.stars',
  sortingDesc: true
});

var Slice = require('basis.data.dataset').Slice;
var List = require('app.list').List;

var latestModules = new Slice({
  source: require('app.modules').withDescription,
  limit: 5,
  orderDesc: true,
  rule: 'data.created'
});

module.exports = new List({
  header: 'Latest components',
  dataSource: latestModules,
  sorting: 'data.created',
  sortingDesc: true
});

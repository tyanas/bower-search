require('basis.data');
require('basis.data.dataset');
require('app.list');

var latestModules = new basis.data.dataset.Slice({
  source: require('app.modules').withDescription,
  limit: 5,
  orderDesc: true,
  rule: 'data.created'
});

module.exports = new app.list.List({
  header: 'Latest components',
  dataSource: latestModules,
  sorting: 'data.created',
  sortingDesc: true
});

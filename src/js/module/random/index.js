require('basis.data');
require('basis.data.dataset');
require('app.list');

var randomModules = new basis.data.dataset.Slice({
  source: require('app.modules').withDescription,
  limit: 5,
  rule: function(){
    return Math.random();
  }
});

module.exports = new app.list.List({
  header: 'Random components',
  dataSource: randomModules
});

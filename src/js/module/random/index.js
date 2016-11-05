var Slice = require('basis.data.dataset').Slice;
var List = require('app.list').List;

var randomModules = new Slice({
  source: require('app.modules').withDescription,
  limit: 5,
  rule: function(){
    return Math.random();
  }
});

module.exports = new List({
  header: 'Random components',
  dataSource: randomModules
});

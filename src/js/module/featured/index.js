var wrap = require('basis.data').wrap;
var List = require('app.list').List;

module.exports = new List({
  header: 'Featured components',
  childNodes: wrap(require('./data.json'))
});

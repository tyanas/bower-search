var wrap = require('basis.data').wrap;
var Dataset = require('basis.data').Dataset;
var Filter = require('basis.data.dataset').Filter;

var dataUrl = 'https://libraries.io/api/bower-search?q=';

// for development speed use local copy of data
/** @cut */ dataUrl = 'data/modules.json';

var all = new Dataset({
  syncAction: require('basis.net.action').create({
    transportClass: require('basis.net.jsonp').Transport,
    url: dataUrl,
    success: function(data){
      /** @cut */ var t = new Date;

      data.forEach(function(item){
        item.description = item.description ? item.description.trim() : '';
        item.searchIndex = basis.object.values(item).join(' ').toLowerCase();
      });

      this.set(wrap(data, true));

      /** @cut */ console.log('apply data', new Date - t);
    }
  })
});

var withDescription = new Filter({
  source: all,
  rule: function(item){
    return item.data.description;
  }
});

module.exports = {
  all: all,
  withDescription: withDescription
};

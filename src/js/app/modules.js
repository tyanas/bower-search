require('basis.data');
require('basis.data.dataset');

// basis.data.dataset.Subset.extend({ ruleEvents: false });
// basis.data.dataset.Slice.extend({ ruleEvents: false });

var dataUrl = 'https://libraries.io/api/bower-search?q=';

// for development speed use local copy of data
/** @cut */ dataUrl = 'data/modules.json';

var all = new basis.data.Dataset({
  syncAction: require('basis.net.action').create({
    transportClass: require('basis.net.jsonp').Transport,
    url: dataUrl,
    success: function(data){
      /** @cut */ var t = new Date;

      data.forEach(function(item){
        item.description = item.description ? item.description.trim() : '';
        item.searchIndex = basis.object.values(item).join(' ').toLowerCase();
      });

      this.set(basis.data.wrap(data, true));

      /** @cut */ console.log('apply data', new Date - t);
    }
  })
});

var withDescription = new basis.data.dataset.Subset({
  source: all,
  rule: function(item){
    return item.data.description;
  }
});

module.exports = {
  all: all,
  withDescription: withDescription
};

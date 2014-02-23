require('basis.ui');
require('basis.data.dataset');

var moment = require('moment');
var allModules = require('app.modules').all;

var SEARCH_PREFIX = '#!/search/';
var SORTING = {
  name: 'asc',
  description: 'asc',
  owner: 'asc',
  forks: 'desc',
  stars: 'desc',
  created: 'desc',
  updated: 'desc',
};

for (var key in SORTING)
  if (SORTING.hasOwnProperty(key))
    SORTING[key] = {
      desc: SORTING[key] == 'desc',
      rule: basis.getter('data.' + key + '||""')
    };

var filteredModules = new basis.data.dataset.Subset({
  active: true,
  source: allModules
});
var source = new basis.data.dataset.Slice({
  source: filteredModules,
  limit: 10,
  orderDesc: SORTING.stars.desc,
  rule: SORTING.stars.rule
});

module.exports = new basis.ui.Node({
  dataSource: source,

  template: resource('./template/list.tmpl'),
  binding: {
    count: basis.data.Value.from(allModules, 'itemsChanged', 'itemCount')
  },
  action: {
    search: function(event){
      this.search(event.sender.value.trim());
    },
    sortByName: function(){
      this.setSortingType('name');
    },
    sortByDescription: function(){
      this.setSortingType('description');
    },
    sortByOwner: function(){
      this.setSortingType('owner');
    },
    sortByForks: function(){
      this.setSortingType('forks');
    },
    sortByStars: function(){
      this.setSortingType('stars');
    },
    sortByCreated: function(){
      this.setSortingType('created');
    },
    sortByUpdated: function(){
      this.setSortingType('updated');
    }
  },

  init: function(){
    basis.ui.Node.prototype.init.call(this);
    this.search(global.location.hash.replace(SEARCH_PREFIX, '').trim());
  },

  handler: {
    sortingChanged: function(){
      console.log(this.sorting, this.sortingDesc);
      this.dataSource.setRule(this.sorting, this.sortingDesc);
      console.log(this.dataSource.rule, this.dataSource.orderDesc);
    }
  },
  
  sorting: source.rule,
  sortingDesc: source.orderDesc,
  setSortingType: function(type){
    this.setSorting(SORTING[type].rule,
      this.sorting === SORTING[type].rule
        ? !this.sortingDesc    // invert order
        : SORTING[type].desc   // default order
    );
  },

  searchValue: '',
  search: function(query){
    if (query == this.searchValue)
      return;

    global.location.hash = query ? '#!/search/' + query : '';

    var rule = basis.fn.$true;
    if (query)
    {
      var rx = new RegExp(basis.string.forRegExp(query).split(/\s/).join('|'), 'i');
      rule = function(item){
        return rx.test(item.data.searchIndex);
      }
    }

    filteredModules.setRule(rule);
  },

  childClass: {
    template: resource('./template/item.tmpl'),
    binding: {
      name: 'data:',
      description: 'data:',
      owner: 'data:',
      website: 'data:',
      forks: 'data:',
      stars: 'data:',
      created: 'data:',
      createdAgo: function(node){
        return moment(node.data.created).fromNow();
      },
      updated: 'data:',
      updatedAgo: function(node){
        return moment(node.data.updated).fromNow();
      }
    }
  }
});

var Node = require('basis.ui').Node;

var List = Node.subclass({
  template: resource('./template/list.tmpl'),
  binding: {
    header: 'header'
  },

  childClass: {
    template: resource('./template/list-item.tmpl'),
    binding: {
      name: 'data:',
      description: 'data:',
      website: 'data:'
    }
  }
});

module.exports = {
  List: List
};

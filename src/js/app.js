basis.require('basis.app');
basis.require('basis.ui');
basis.require('basis.data');
/** @cut */ basis.require('basis.devpanel');

module.exports = basis.app.create({
  replace: 'app-placeholder',

  init: function(){
    /** @cut */ var t = new Date;

    var dataState = basis.data.Value.from(require('app.modules').all, 'stateChanged', 'state');
    var appNode = new basis.ui.Node({
      template: resource('./template/layout.tmpl'),
      binding: {
        loading: dataState.as(function(state){
          return state != 'ready';
        }),
        message: dataState.as(function(state){
          switch (String(state))
          {
            case 'processing':
              return 'Loading packages...';
            case 'error':
              return 'Failed to load component list :(';
            default:
              return '';
          }
        }),

        // sub-views
        featured: resource('./module/featured/index.js'),
        hot: resource('./module/hot/index.js'),
        search: resource('./module/search/index.js'),
        latest: resource('./module/latest/index.js'),
        random: resource('./module/random/index.js')
      }
    });

    /** @cut */ console.log('create views', new Date - t);
    
    return appNode;
  }
});

(function() {
  angular.module('app')
    .config(mdDateLocaleConfig);

  function mdDateLocaleConfig($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('DD/MM/YYYY');
    };

  }

})();

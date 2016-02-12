(function() {
  'use strict';

  angular
    .module('app')
    .constant('ROUTES', {

      FILE_ROUTE: 'http://192.168.10.10/',
      API_ROUTE: 'http://192.168.10.10/api/'

      //FILE_ROUTE:'http://127.0.0.1:8888/novaera_laravel/public/',
      //API_ROUTE: 'http://127.0.0.1:8888/novaera_laravel/public/api/'
      //Vagrant
      //FILE_ROUTE:'http://189.189.108.60:8888/novaera_laravel/public/',
      //API_ROUTE: 'http://189.189.108.60:8888/novaera_laravel/public/api/'

      //Virtualizado
      // FILE_ROUTE:'http://homestead.app/'
      //FILE_ROUTE:'http://homestead.app/',
      //API_ROUTE: 'http://homestead.app/api/'
      //Homestead windows
      //   FILE_ROUTE: 'http://192.168.10.10/',
      // API_ROUTE: 'http://192.168.10.10/api/'
    }); 
})(); 

(function() {
  'use strict';

  angular
    .module('app')
    .constant('ROUTES', {
        //URL-Producción
        FILE_ROUTE: 'http://104.197.70.163/',
        API_ROUTE: 'http://104.197.70.163/api/'
        //Local
        //FILE_ROUTE:'http://127.0.0.1:8888/novaera_laravel/public/',
        //API_ROUTE: 'http://127.0.0.1:8888/novaera_laravel/public/api/'
        //Vagrant
        //FILE_ROUTE: 'http://192.168.10.10/',
        //API_ROUTE: 'http://192.168.10.10/api/'
    }); 
})(); 

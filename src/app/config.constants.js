(function() {
  'use strict';

  angular
    .module('app')
    .constant('ROUTES', {
        //URL-Producción
        //FILE_ROUTE: 'http://www.novaera-projects.org/laravel/',
        //API_ROUTE: 'http://www.novaera-projects.org/laravel/api/'
        //FILE_ROUTE: 'http://www.novaera-projects.org/laravel/',
        //API_ROUTE: 'http://www.novaera-projects.org/laravel/api'
        FILE_ROUTE: 'http://192.168.10.10/',
        API_ROUTE: 'http://192.168.10.10/api/'
    }); 
})(); 

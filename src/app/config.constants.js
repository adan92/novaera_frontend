(function() {
    'use strict';

    angular
        .module('app')
        .constant('ROUTES',{

            //DANIEL
            //FILE_ROUTE:'http://127.0.0.1:8888/novaera_laravel/public/',
            //API_ROUTE: 'http://127.0.0.1:8888/novaera_laravel/public/api/'
            //Vagrant
           //FILE_ROUTE:'http://homestead.app/',
            //API_ROUTE: 'http://homestead.app/api/'
            //Homestead windows
            FILE_ROUTE:'http://192.168.10.10/',
            API_ROUTE:'http://192.168.10.10/api/'


            //Virtualizado
            //FILE_ROUTE:'http://148.204.58.168/novaera_laravel/public/',
            //API_ROUTE: 'http://148.204.58.168/novaera_laravel/public/a
           // FILE_ROUTE:'http://192.168.10.10/',
           // API_ROUTE: 'http://192.168.10.10/api/'

            //FILE_ROUTE:'http://189.189.108.60:8888/novaera_laravel/public/',
            //API_ROUTE: 'http://189.189.108.60:8888/novaera_laravel/public/api/'
            //Equipo
            /*
            FILE_ROUTE:'http://127.0.0.1:8000/files/',
            API_ROUTE: 'http://127.0.0.1:8000/api/'
             */
        });
})()

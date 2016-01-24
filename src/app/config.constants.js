(function() {
    'use strict';

    angular
        .module('app')
        .constant('ROUTES',{

            //DANIEL
            FILE_ROUTE:'http://homestead.app/',
            API_ROUTE: 'http://homestead.app/api/'



            //Virtualizado
            // FILE_ROUTE:'http://127.0.0.1:8888/novaera_laravel/public/',
            // API_ROUTE: 'http://127.0.0.1:8888/novaera_laravel/public/api/'
            //Equipo
            /*
            FILE_ROUTE:'http://127.0.0.1:8000/files/',
            API_ROUTE: 'http://127.0.0.1:8000/api/'
             */
        });
})()
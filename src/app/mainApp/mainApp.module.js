/**
 * Created by lockonDaniel on 10/14/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp', [
           'app.mainApp.login',
           'app.mainApp.intro',
           'app.mainApp.proyectos',
           'app.mainApp.organizaciones',
           'app.mainApp.fondeos',
           'app.mainApp.personas',
           'app.mainApp.admin'

        ]);
})();
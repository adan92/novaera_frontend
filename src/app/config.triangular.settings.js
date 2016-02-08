(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig)
        .config(dateConfig)
        .config(restangularConfig);
    /* @ngIngect */


    /* @ngInject */

    function restangularConfig($httpProvider,RestangularProvider,ROUTES)
    {
        var api = ROUTES.API_ROUTE;
        RestangularProvider.setBaseUrl(api);

        $httpProvider.interceptors.push('AuthInterceptor');
    }


    /* @ngInject */
    function translateConfig(triSettingsProvider, APP_LANGUAGES) {
        // set app name & logo (used in loader, sidemenu, login pages, etc)
        triSettingsProvider.setName('NOVAERA');
        triSettingsProvider.setLogo('assets/images/novaera_logo.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('2.2.0');

        // setup available languages in triangular
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            triSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }

    function dateConfig($mdDateLocaleProvider)
    {
        var myShortMonths = ['Ene', 'Feb', 'Mar', 'Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        /**
         * DateTime
         */

        $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miércoles','Jueves','Viernes','Sábado'];
        $mdDateLocaleProvider.shortDays = ['Dom', 'Lun', 'Mar', 'Mie','Jue','Vie','Sab'];
        $mdDateLocaleProvider.shortMonths = myShortMonths;

        // Can change week display to start on Monday.
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        // Example uses moment.js to parse and format dates.
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('L');
        };
        $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
            return myShortMonths[date.getMonth()] + ' ' + date.getFullYear();
        };
        // In addition to date display, date components also need localized messages
        // for aria-labels for screen-reader users.
        $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
            return 'Semaine ' + weekNumber;
        };
        $mdDateLocaleProvider.msgCalendar = 'Calendario';
        $mdDateLocaleProvider.msgOpenCalendar = 'Abrir el Calendario';
    }

})();
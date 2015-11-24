(function() {
    'use strict';

    angular
        .module('triangular.components')
        .filter('startFrom', startFrom);

    function startFrom() {
        return filterFilter;

        ////////////////

        function filterFilter(input, start) {
            if(start===undefined || input===undefined)
                return null;
            start = +start;
            return input.slice(start);
        }
    }

})();
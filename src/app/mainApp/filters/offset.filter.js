angular.module('app').filter('offset', function() {
    return function (input, start) {
        if (input != null) {
            return input.slice(parseInt(start, 10));
        }
        return null;
    };
});
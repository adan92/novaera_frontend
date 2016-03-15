angular.module('app').filter('routeFilter', function() {
    return function(input) {
        if(input===undefined)
            return "";
        return input.split('/').pop();
    };
});

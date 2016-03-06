/**
 * Created by lockonDaniel on 3/6/16.
 */

angular.module('app').filter('countName', function() {
    return function(value) {
        try {
                if(parseInt(value)==1)
                {
                    return value+' seleccionada';
                }
                return value+' seleccionadas';
        }catch (err)
        {
            return null;
        }

    };
});

(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('convocatoriaFondeosController', convocatoriaFondeosController);

    /* @ngInject */
    function  convocatoriaFondeosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        $scope.fondeo = {};
        $scope.fondeos2 = ('Programa de Fondeo 1, Programa de Fondeo 3,Programa de Fondeo 4,Programa de Fondeo 2,'+
        ' Programa de Fondeo 5').split(',').map(function(fondeo2) {
                return {abbrev: fondeo2};
            })


        vm.todos = [
            {description: 'Modalidad 1',date:'11/01/2016',date2:'11/02/2016' ,priority: 'Persona Fisica', selected: true},
            {description: 'Modalidad 2', date:'11/01/2016',date2:'11/04/2016' ,priority: 'Persona Fisica', selected: false},
            {description: 'Modalidad 3',date:'11/03/2016',date2:'11/04/2016'  ,priority: 'Persona Moral', selected: true},
            {description: 'Modalidad 4',date:'11/05/2016',date2:'11/06/2016'  ,priority: 'Persona Moral', selected: false},

        ];
        vm.orderTodos = orderTodos;
        vm.removeTodo = removeTodo;

        //////////////////////////

        function orderTodos(task) {
            switch(task.priority){
                case 'Persona Fisica':
                    return 1;
                case 'Persona Moral':
                    return 2;
                case 'Todos':
                    return 3;
                default: // no priority set
                    return 4;
            }
        }

        function removeTodo(todo){
            for(var i = vm.todos.length - 1; i >= 0; i--) {
                if(vm.todos[i] === todo) {
                    vm.todos.splice(i, 1);
                }
            }
        }

        // watches

        $scope.$on('addTodo', function( ev ){
            $mdDialog.show({
                templateUrl: 'app/examples/todo/add-todo-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DialogController',
                controllerAs: 'vm'
            })
                .then(function(answer) {
                    vm.todos.push(answer);
                });
        });
    }

})();


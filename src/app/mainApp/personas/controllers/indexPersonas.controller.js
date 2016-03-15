(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('indexPersonasController', indexPersonasController);

    /* @ngInject */

        function indexPersonasController($scope) {
            var vm = this;
            vm.columns = [{
                title: '',
                field: 'thumb',
                sortable: false,
                filter: 'tableImage'
            },{
                title: 'Name',
                field: 'name',
                sortable: true
            },{
                title: 'Mail',
                field: 'mail',
                sortable: true
            },{
                title: 'Organizacion',
                field: 'organization',
                sortable: true
            },{
                title: 'Puesto',
                field: 'job',
                sortable: true
            },{
                title: 'Telefono Celular',
                field: 'mobilephone',
                sortable: true
            }];

            vm.contents = [{
                thumb:'assets/images/avatars/avatar-1.png',
                name: 'Cerda Martinez Francisco Javier',
                mail: 'fco.cerda.mtz@gmail.com',
                organization: 'P&D Systems',
                job:'Developer, Tester',
                mobilephone:'55-30-84-29-29'
            },{
                thumb:'assets/images/avatars/avatar-2.png',
                name: 'Rojas Alejo Diana Isabel',
                mail: 'diana.alejo.rojas@gmail.com',
                organization: 'P&D Systems',
                job:'Developer',
                mobilephone:'55-30-55-12-29'
            },{
                thumb:'assets/images/avatars/avatar-3.png',
                name: 'Franco Rodriguez Daniel Zueriel',
                mail: 'daniboyjr@hotmail.com',
                organization: 'Merol',
                job:'Developer, Tester',
                mobilephone:'55-32-84-29-43'
            },{
                thumb:'assets/images/avatars/avatar-4.png',
                name: 'Eric Doe',
                mail: 'eric@hotmail.com',
                organization: 'SACA',
                job:'Developer, Tester',
                mobilephone:'55-32-82-29-43'
            },{
                thumb:'assets/images/avatars/avatar-5.png',
                name: 'John Doe',
                mail: 'john@gmail.com',
                organization: 'Universa',
                job:'CEO',
                mobilephone:'55-32-82-29-43'
            },{
                thumb:'assets/images/avatars/avatar-1.png',
                name: 'George Doe',
                mail: 'george@yahoo.com',
                organization: 'Universa',
                job:'Developer, Tester',
                mobilephone:'55-32-82-29-43'
            },{
                thumb:'assets/images/avatars/avatar-2.png',
                name: 'Ann Ronson',
                mail: 'a.ronson@hotmail.com',
                organization: 'ronson & sons',
                job:'CEO',
                mobilephone:'55-32-82-29-43'
            },{
                thumb:'assets/images/avatars/avatar-3.png',
                name: 'Adam Ronson',
                mail: 'a2.ronson@hotmail.com',
                organization: 'ronson & sons',
                job:'Developer, Tester',
                mobilephone:'55-32-82-29-43'
            },{
                thumb:'assets/images/avatars/avatar-4.png',
                name: 'Hansel Doe',
                mail: 'h.doe@hotmail.com',
                organization: 'ronson & sons',
                job:'Developer, Tester',
                mobilephone:'55-32-82-29-43'
            },{
                thumb:'assets/images/avatars/avatar-5.png',
                name: 'Tony Doe',
                mail: 't.doe@hotmail.com',
                organization: 'ronson & sons',
                job:'Developer, Tester',
                mobilephone:'55-32-82-29-43'
            }];
            //grafica de Pastel
            $scope.PersonasLabels= ['P&D Systems','Merol','SACA','Universa','ronson & sons'];
            $scope.PersonasData= ['2','1','1','2','4'];

            // grafica area
            $scope.Personas_area_labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];
            $scope.Personas_area_series = ['P&D Systems','Merol','SACA','Universa','ronson & sons'];
            $scope.Personas_area_data = [
                [0, 1, 0, 2, 8, 3, 2],
                [0, 0, 1, 1, 0, 0,1],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 1, 0, 0, 0,2],
                [0, 0, 0, 0, 0, 1, 4]
            ];
        }




    })();


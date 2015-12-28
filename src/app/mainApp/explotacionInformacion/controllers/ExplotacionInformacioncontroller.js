(function() {
    'use strict';

    angular
        .module('app.mainApp.explotacionInformacion')
        .controller('explotacionInformacionController', explotacionInformacionController);

    /* @ngInject */

        function explotacionInformacionController($scope) {
            var vm = this;
            vm.columns = [{
                title: 'Name',
                field: 'name',
                sortable: true
            }, {
                title: 'Type',
                field: 'type',
                sortable: true
            }, {
                title: 'Status',
                field: 'status',
                sortable: true
            }, {
                title: 'Fecha de Registro',
                field: 'date',
                sortable: true
            }, {
                title: 'Area',
                field: 'descriptor',
                sortable: true
            }
            ];

            vm.contents = [{

                name: 'Cerda Martinez Francisco Javier',
                type: 'person',
                organization: 'P&D Systems',
                job: 'Developer, Tester',
                mobilephone: '55-30-84-29-29',
                status: 'Validado',
                date: '12-12-15',
                descriptor: 'Tecnología'
            }, {

                name: 'Rojas Alejo Diana Isabel',
                type: 'person',
                organization: 'P&D Systems',
                job: 'Developer',
                mobilephone: '55-30-55-12-29',
                status: 'Validado',
                date: '12-12-15',
                descriptor: 'Tecnología'
            }, {

                name: 'Franco Rodriguez Daniel Zueriel',
                type: 'person',
                organization: 'Merol',
                job: 'Ingeniero de Distribucion',
                mobilephone: '55-32-84-29-43',
                status: 'Validado',
                date: '12-12-15',
                descriptor: 'Manufactura'
            }, {

                name: 'Eric Doe',
                type: 'person',
                organization: 'SACA',
                job: 'Analista de Riesgos',
                mobilephone: '55-32-82-29-43',
                status: 'Validado',
                date: '13-12-15',
                descriptor: 'Servicios'
            }, {

                name: 'John Doe',
                type: 'person',
                organization: 'Universa',
                job: 'CEO',
                mobilephone: '55-32-82-29-43',
                status: 'Validado',
                date: '16-12-15',
                descriptor: 'Tecnología'
            }, {

                name: 'George Doe',
                type: 'person',
                organization: 'Universa',
                job: 'Developer, Tester',
                mobilephone: '55-32-82-29-43',
                status: 'Validado',
                date: '12-12-15',
                descriptor: 'Tecnología'
            }, {

                name: 'Ann Ronson',
                type: 'person',
                organization: 'ronson & sons',
                job: 'Diseñador',
                mobilephone: '55-32-82-29-43',
                status: 'Validado',
                date: '11-12-15',
                descriptor: 'Manufactura'
            }, {

                name: 'Adam Ronson',
                type: 'person',
                organization: 'ronson & sons',
                job: 'Developer, Tester',
                mobilephone: '55-32-82-29-43',
                status: 'Validado',
                date: '15-12-15',
                descriptor: 'Manufactura'
            }, {

                name: 'Hansel Doe',
                type: 'person',
                organization: 'ronson & sons',
                job: 'Developer, Tester',
                mobilephone: '55-32-82-29-43',
                status: 'Validado',
                date: '22-12-15',
                descriptor: 'Manufactura'
            }, {

                name: 'Tony Doe',
                type: 'person',
                organization: 'ronson & sons',
                job: 'Developer, Tester',
                mobilephone: '55-32-82-29-43',
                status: 'no Validado',
                date: '22-11-15',
                descriptor: 'Manufactura'
            },
                {
                    type: 'Organizacion',
                    name: 'ronson & sons',
                    status: 'Activa',
                    date: '22-11-15',
                    descriptor: 'Manufactura'
                },
                {
                    type: 'Organizacion',
                    name: 'P & D Systems',
                    status: 'Activa',
                    date: '22-10-15',
                    descriptor: 'Tecnologia'
                },
                {
                    type: 'Organizacion',
                    name: 'Universa',
                    status: 'Activa',
                    date: '25-11-15',
                    descriptor: 'Tecnologia'
                },
                {
                    type: 'Organizacion',
                    name: 'Merol',
                    status: 'Activa',
                    date: '2-11-15',
                    descriptor: 'Manufactura'
                },
                {
                    type: 'Organizacion',
                    name: 'SACA',
                    status: 'Activa',
                    date: '2-11-15',
                    descriptor: 'Servicios'
                },
                {
                    type: 'Proyecto',
                    name: 'Proyecto 1',
                    status: 'Aceptado',
                    date: '2-11-15',
                    descriptor: 'Tecnologia'
                },
                {
                    type: 'Proyecto',
                    name: 'Proyecto 2',
                    status: 'Rechazado',
                    date: '2-11-15',
                    descriptor: 'Tecnologia'
                },
                {
                    type: 'Proyecto',
                    name: 'Proyecto 3',
                    status: 'por Validar',
                    date: '2-11-15',
                    descriptor: 'Manufactura'
                },
                {
                    type: 'Proyecto',
                    name: 'Proyecto 4',
                    status: 'Aceptado',
                    date: '2-11-15',
                    descriptor: 'Manufactura'
                },
                {
                    type: 'Proyecto',
                    name: 'Proyecto 5',
                    status: 'Aceptado',
                    date: '30-12-15',
                    descriptor: 'Servicios'
                },

            ];
            //grafica de Pastel
            $scope.PersonasLabels = ['P & D Systems', 'Merol', 'SACA', 'Universa', 'ronson & sons'];
            $scope.PersonasData = ['2', '1', '1', '2', '4'];

            // grafica area
            $scope.Personas_area_labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];
            $scope.Personas_area_series = ['P&D Systems', 'Merol', 'SACA', 'Universa', 'ronson & sons'];
            $scope.Personas_area_data = [
                [0, 1, 0, 2, 8, 3, 2],
                [0, 0, 1, 1, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 1, 0, 0, 0, 2],
                [0, 0, 0, 0, 0, 1, 4]
            ];

            vm.labels = ['Organizaciones', 'Personas', 'Proyectos', 'resultados'];
            vm.series = ['Aceptado-Validado', 'Rechasado-No validado','Por Validar'];
            vm.data = [
                [5, 10, 3,0],
                [0, 1, 1,0],
                [0, 0, 1,0]

            ];

            /////////
            vm.labelspolar = ["Manufactura", "Tecnologia", "Servicios"];
            vm.datapolar = [6, 7, 7];
            vm.labelsfull = ["Tecnologia", "Manufactura", "Servicios"];
            vm.seriesfull = ['Organizaciones', 'Personas', 'Proyectos', 'Resultados'];
            vm.datafull = [
                [2,2,1],
                [5, 5, 2],
                [2, 2, 1],
                [0, 0, 0]
            ];

        }









    })();


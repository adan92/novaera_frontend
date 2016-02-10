/**
 * Created by darkxavier on 12/30/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('revisarProyectosAdminController', revisarProyectosAdminController);

    /* @ngInject */
    function revisarProyectosAdminController(Admin) {
        var vm = this;
        vm.solicitudes=[];
        loadProjects();

        vm.solicitudes = [
            {
                id: 1,
                proyecto: "Proyecto 2",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "50,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 1",
                trlFinal: "TRL1",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2014",
                resultado: "En Desarrollo del 2do Prototipo",
                validado:"Terminado"
            }, {
                id: 2,
                proyecto: "Proyecto 1",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-15",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado:"Terminado"
            },{
                id: 3,
                proyecto: "Proyecto 3",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "150,0000",
                montoApoyado: "90,0000",
                trlInicial: "TRL 1",
                trlFinal: "",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2016",
                resultado: "",
                validado:"Aceptado"
            }, {
                id: 4,
                proyecto: "Proyecto 4",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-16",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado:"Aceptado"
            },
            {
                id: 5,
                proyecto: "Proyecto 5",
                fondo: "Programa de fondeo 7",
                modalidad: "Modalidad 5",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 4",
                montosolicitado: "50,0000",
                montoApoyado: "",
                trlInicial: "TRL 1",
                trlFinal: "",
                fechaRegistro: "20-10-2014",
                fechaCierre: "",
                resultado: "",
                validado:"Rechazado"
            }, {
                id: 6,
                proyecto: "Proyecto 8",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "50,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "",
                resultado: "",
                validado:"Rechazado"
            },{
                id: 7,
                proyecto: "Proyecto 5",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "50,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 1",
                trlFinal: "TRL1",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2014",
                resultado: "En Desarrollo del 2do Prototipo",
                validado:"Aceptado"
            }, {
                id: 8,
                proyecto: "Proyecto 3",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-15",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado:"Aceptado"
            },


        ];


        vm.selectedItem = null;

        vm.selectedSolicitudes = [];

        function loadProjects(){
            var promise=Admin.getStatusProjects();
            promise.then(function(res){
                console.log(res);
            });
        }
    }
})

();
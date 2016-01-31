/**
 * Created by lockonDaniel on 11/2/15.
 */
/**
 * Created by lockonDaniel on 10/17/15.
 */
(function() {
  'use strict';

  angular
    .module('app.mainApp.organizaciones')
    .controller('informacionOrganizacionesController', informacionOrganizacionesController);

  /* @ngInject */
  function informacionOrganizacionesController($scope, Upload, $timeout, $mdToast, $rootScope, $state, $log) {
    var vm = this;

    //     vm.addItem = addItem;
    //     vm.file = null;

    //     function addItem() {
    //       Upload.upload({
    //         url: 'http://127.0.0.1:8888/novaera_laravel/public/api/Organizacion/Upload',
    //         data: {
    //           file: vm.file,
    //           organizacion: vm.newOrganizacion
    //         }
    //       }).then(function(resp) {
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //       }, function(resp) {
    //         console.log('Error status: ' + resp.status);
    //       }, function(evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //       });

    //     }

    //     vm.newOrganization = {
    //       palabras_clave: [],
    //       contacto: []
    //     };

    //     $scope.$watchGroup(['vm.selectedItem'], function(newValues, oldValues, scope) {

    //       vm.loadEstados();
    //       if (newValues[0] == null && oldValues[0] != null) {
    //         vm.newOrganization = {
    //           palabras_clave: []
    //         };
    //         vm.selectedEstado = null;
    //         $scope.registerOrganization.$setPristine();
    //         $flow.files == null;
    //       }

    //       if (vm.selectedItem != null) {
    //         vm.selectedEstado = (vm.searchEstados(vm.selectedItem.idMunicipio));
    //         vm.selectedEstado = vm.selectedEstado[0];
    //         vm.selectedItem.idMunicipio = (vm.searchMunicipio(vm.selectedItem.idMunicipio));
    //         vm.selectedItem.idMunicipio = vm.selectedItem.idMunicipio[0].id;
    //         vm.selectedItem.palabras_clave.map(function(keyword) {
    //           keyword._lowername = keyword.nombre.toLowerCase();
    //           return keyword;
    //         });
    //         vm.newOrganization = angular.copy(vm.selectedItem);
    //       }

    //       // newValues array contains the current values of the watch expressions
    //       // with the indexes matching those of the watchExpression array
    //       // i.e.
    //       // newValues[0] -> $scope.foo
    //       // and
    //       // newValues[1] -> $scope.bar
    //     });

    //     vm.organizaciones = loadOrganizaciones();

    //     function loadOrganizaciones() {
    //       return [{
    //         id: 1,
    //         nombre: "La organización",
    //         descripcion: "Organización de prueba",
    //         palabras_clave: [{
    //           id: 1,
    //           nombre: "Ingeniería"
    //         }, {
    //           id: 2,
    //           nombre: "Comercio"
    //         }],
    //         experiencia: "3 años de Desarrollo de Proyectos Tecnológicos",
    //         giro: "Tecnologías de la Información",
    //         mision: "Ser la empresa lider de TI en México",
    //         razon_social: "Empresa S.A de CV",
    //         RFC: "XXXXXXXXXXXX",
    //         RENIECYT: "XXXXXXXXXX",
    //         acta_constitutiva: "/organizaciones/1/acta.pdf",
    //         representante_legal: "Edgar Jonatan Larios Tapia",
    //         direccion: "Calle X Numero Y Colonia Z, Guanajuato",
    //         idMunicipio: 12,
    //         modalidades: [{
    //           id_fondo: 1,
    //           id_modalidad: 1,
    //           solicitud: "XXXXXX",
    //           monto_solicitado: 200000,
    //           monto_apoyado: 150000,
    //           trl_inicial: 1,
    //           trl_final: 2,
    //           fecha_registro: '17-10-2015',
    //           fecha_cierre: '19-10-2015',
    //           modalidad: {
    //             nombre: 'Modalidad X',
    //             requisitos: 'Ninguno',
    //             criterios_evalaucion: 'Criterios',
    //             entregables: 'Entrgable X',
    //             figura_apoyo: 'Figura X'
    //           }

    //         }],
    //         resultado_organizacion: [{
    //           id_resultado: 1,
    //           id_schema: 1,
    //           id_class: 1,
    //           resultado: {
    //             nombre: 'Resultado 1',
    //             descripcion: 'El Resultado',
    //             palabras_clave: 'Resultado, Proyecto, Desarrollo',
    //             area_aplicacion: 'Venta de Proyectos',
    //             tipo: 'Proceso',
    //             fecha: '12-10-2010',
    //             avance: 'Completado',
    //             status: 'Operativo',
    //             plan_explotacion: 'El plan es que se registren las personas dentro del sistema',
    //             fecha_inicio: "19-10-2015",
    //             fecha_final: "20-10-2015"
    //           }

    //         }],
    //         contacto: [{
    //             id: 1,
    //             informacion: {
    //               id: 1,
    //               id_persona: 1,
    //               telefono: '551234567',
    //               email: 'jhlara@empresa.com.mx',
    //               direccion: 'Calle X Numero Y',
    //               nombre: 'Edgar Larios Tapia'
    //             }
    //           }

    //         ],
    //         estadisticas: {
    //           resultados: {
    //             data: [3, 1, 5],
    //             labels: ['Procesos', 'Productos', 'Servicios']
    //           },
    //           fondeos: {
    //             series: ['Monto Apoyado', 'Monto Solicitado'],
    //             data: [
    //               [130000, 200000, 350000, 100000, 125000, 130000],
    //               [165000, 200000, 400000, 230000, 200000, 130000]
    //             ],
    //             labels: ['Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre']
    //           }
    //         },
    //         personas: [{
    //             id_organizacion: 1,
    //             id_persona: 1,
    //             id_schema: 1,
    //             id_class: 1,
    //             fecha_inicio: '10-01-02',
    //             fecha_fin: '',
    //             schema: {
    //               id: 1,
    //               id_class: 1,
    //               descripcion: 'Empleado'
    //             },
    //             persona: {
    //               id: 1,
    //               id_contacto: 1,
    //               grado_estudios: 'Maestría',
    //               especialidad: 'Dirección de Empresas',
    //               areas_interes: 'Ventas y dirección de campañas publicitarias',
    //               areas_experiencia: 'Publicidad Agresiva',
    //               rfc: 'XXXX000000123',
    //               genero: 'Mujer',
    //             },
    //             contacto: {
    //               id: 1,
    //               nombre: 'Josefina Hernández Lara',
    //               telefono: '551234567',
    //               email: 'jhlara@empresa.com.mx',
    //               direccion: 'Calle X Numero Y'
    //             }
    //           }, {
    //             id_organizacion: 1,
    //             id_persona: 2,
    //             id_schema: 1,
    //             id_class: 1,
    //             fecha_inicio: '10-01-02',
    //             fecha_fin: '',
    //             schema: {
    //               id: 1,
    //               id_class: 1,
    //               descripcion: 'Empleado'
    //             },
    //             persona: {
    //               id: 1,
    //               id_contacto: 1,
    //               grado_estudios: 'Licenciatura',
    //               especialidad: 'Mercadotecnia',
    //               areas_interes: 'Ventas y dirección de campañas publicitarias',
    //               areas_experiencia: 'Publicidad Agresiva',
    //               rfc: 'XXXX000000123',
    //               genero: 'Mujer',
    //             },
    //             contacto: {
    //               id: 1,
    //               nombre: 'Persona De Prueba',
    //               telefono: '551234567',
    //               email: 'jhlara@empresa.com.mx',
    //               direccion: 'Calle X Numero Y'
    //             }
    //           }, {
    //             id_organizacion: 1,
    //             id_persona: 3,
    //             id_schema: 1,
    //             id_class: 1,
    //             fecha_inicio: '10-01-02',
    //             fecha_fin: '',
    //             schema: {
    //               id: 1,
    //               id_class: 1,
    //               descripcion: 'Empleado'
    //             },
    //             persona: {
    //               id: 1,
    //               id_contacto: 1,
    //               grado_estudios: 'Doctorado',
    //               especialidad: 'Ciencias Computacionales',
    //               areas_interes: 'Ventas y dirección de campañas publicitarias',
    //               areas_experiencia: 'Publicidad Agresiva',
    //               rfc: 'XXXX000000123',
    //               genero: 'Mujer',
    //             },
    //             contacto: {
    //               id: 1,
    //               nombre: 'Chadwick Carreto Arellano',
    //               telefono: '551234567',
    //               email: 'jhlara@empresa.com.mx',
    //               direccion: 'Calle X Numero Y'
    //             }
    //           }, {
    //             id_organizacion: 1,
    //             id_persona: 4,
    //             id_schema: 1,
    //             id_class: 1,
    //             fecha_inicio: '10-01-02',
    //             fecha_fin: '',
    //             schema: {
    //               id: 1,
    //               id_class: 1,
    //               descripcion: 'Empleado'
    //             },
    //             persona: {
    //               id: 1,
    //               id_contacto: 1,
    //               grado_estudios: 'Maestría',
    //               especialidad: 'Administración de TI',
    //               areas_interes: 'Ventas y dirección de campañas publicitarias',
    //               areas_experiencia: 'Publicidad Agresiva',
    //               rfc: 'XXXX000000123',
    //               genero: 'Mujer',
    //             },
    //             contacto: {
    //               id: 1,
    //               informacion: {
    //                 id: 1,
    //                 id_persona: 1,
    //                 telefono: '551234567',
    //                 email: 'jhlara@empresa.com.mx',
    //                 direccion: 'Calle X Numero Y',
    //                 nombre: 'Edgar Larios Tapia'
    //               }

    //             }
    //           }

    //         ]

    //       }, {
    //         id: 1,
    //         nombre: "Otra Organización",
    //         descripcion: "Organización de prueba",
    //         palabras_clave: "Organizacion,Prueba",
    //         experiencia: "3 años de Desarrollo de Proyectos Tecnológicos",
    //         giro: "Tecnologías de la Información",
    //         mision: "Ser la empresa lider de TI en México",
    //         razon_social: "Empresa S.A de CV",
    //         RFC: "XXXXXXXXXXXX",
    //         RENIECYT: "XXXXXXXXXX",
    //         acta_constitutiva: "/organizaciones/1/acta.pdf",
    //         representante_legal: "Edgar Jonatan Larios Tapia",
    //         direccion: "Calle X Numero Y Colonia Z, Guanajuato",
    //         idMunicipio: 13,
    //         modalidad: [{
    //           id_fondo: 1,
    //           id_modalidad: 1,
    //           solicitud: "XXXXXX",
    //           monto_solicitado: 200000,
    //           monto_apoyado: 150000,
    //           trl_inicial: 1,
    //           trl_final: 2,
    //           fecha_registro: '17-10-2015',
    //           fecha_cierre: '19-10-2015',
    //           nombre: 'Modalidad X',
    //           requisitos: 'Ninguno',
    //           criterios_evalaucion: 'Criterios',
    //           entregables: 'Entrgable X',
    //           figura_apoyo: 'Figura X'
    //         }],
    //         resultado: [{
    //           id_resultado: 1,
    //           id_schema: 1,
    //           id_class: 1,
    //           nombre: 'Resultado 1',
    //           descripcion: 'El Resultado',
    //           palabras_clave: 'Resultado, Proyecto, Desarrollo',
    //           area_aplicacion: 'Venta de Proyectos',
    //           tipo: 'Proceso',
    //           fecha: '12-10-2010',
    //           avance: 'Completado',
    //           status: 'Operativo',
    //           plan_explotacion: 'El plan es que se registren las personas dentro del sistema',
    //           fecha_inicio: "19-10-2015",
    //           fecha_final: "20-10-2015"
    //         }],
    //         contacto: [{
    //           id: 1,
    //           informacion: {
    //             id: 1,
    //             id_persona: 1,
    //             telefono: '551234567',
    //             email: 'jhlara@empresa.com.mx',
    //             direccion: 'Calle X Numero Y',
    //             nombre: 'Edgar Larios Tapia'
    //           }
    //         }]

    //       }];
    //     }

    //     //Variables para que encuentre el estado

    //     //Variables para las columnas

    //     vm.query = {
    //       filter: '',
    //       limit: '10',
    //       order: 'id_persona',
    //       page: 1
    //     };
    //     vm.selected = [];
    //     vm.filter = {
    //       options: {
    //         debounce: 500
    //       },
    //       form: $scope.registerOrganization

    //     };
    //     vm.getUsers = getUsers;
    //     vm.removeFilter = removeFilter;
    //     vm.getUsers = getUsers;
    //     vm.removeFilter = removeFilter;

    //     function getUsers(order) {
    //       vm.query.order = order;
    //     }

    //     function removeFilter() {
    //       vm.filter.show = false;
    //       vm.query.filter = '';

    //       if (vm.filter.form.$dirty) {
    //         vm.filter.form.$setPristine();

    //       }
    //     }

    //     //Variables para el md-autocomplete

    //     vm.selectedItem = null;
    //     vm.searchText = null;
    //     vm.querySearch = querySearch;
    //     vm.simulateQuery = false;
    //     vm.isDisabled = false;

    //     //////////////////
    //     function querySearch(query) {
    //       var results = query ? vm.organizaciones.filter(createFilterFor(query)) : vm.organizaciones,
    //         deferred;
    //       return results;

    //     }

    //     /**
    //      * Create filter function for a query string
    //      */
    //     function createFilterFor(query) {
    //       return function filterFn(organizacion) {
    //         return (organizacion.nombre.indexOf(query) === 0);
    //       };
    //     }

    //     /**
    //      * Functions to look in a contacts list
    //      */

    //     vm.contactText = null;
    //     vm.selectedContact = null;
    //     vm.contactSearch = contactSearch;
    //     vm.contacts = getContacts();
    //     vm.appendContact = appendContact;

    //     function contactSearch(query) {
    //       var results = query ? vm.contacts.filter(createFilterForContact(query)) : vm.contacts,
    //         deferred;
    //       return results
    //     }

    //     function createFilterForContact(query) {
    //       var lowercaseQuery = angular.lowercase(query);
    //       return function filterFn(contacto) {
    //         return (contacto._lowername.indexOf(lowercaseQuery) === 0)
    //       };
    //     }

    //     function getContacts() {
    //       var contacts = [{
    //         id: 1,
    //         informacion: {
    //           id: 1,
    //           id_persona: 1,
    //           telefono: '551234567',
    //           email: 'jhlara@empresa.com.mx',
    //           direccion: 'Calle X Numero Y',
    //           nombre: 'Edgar Larios Tapia'
    //         }
    //       }, {
    //         id: 2,
    //         informacion: {
    //           id: 1,
    //           id_persona: 1,
    //           telefono: '551234567',
    //           email: 'jhlara@empresa.com.mx',
    //           direccion: 'Calle X Numero Y',
    //           nombre: 'Chadwick Carreto Arellano'
    //         }
    //       }];
    //       return contacts.map(function(contact) {
    //         contact._lowername = contact.informacion.nombre.toLowerCase();
    //         return contact;
    //       })
    //     }

    //     function appendContact(chip) {
    //       if (vm.newOrganization.contacto.length > 0)
    //         return vm.newOrganization.contacto[0];
    //       return chip;
    //     }

    //     /***
    //      * Functions to look for keywords
    //      */

    //     vm.keywordText = null;
    //     vm.selectedKeyword = null;
    //     vm.keywordSearch = keywordSearch;
    //     vm.keywords = getKeywords();
    //     vm.readonly = false;
    //     vm.appendChip = appendChip;

    //     /**
    //      *
    //      * @param chip
    //      */

    //     function appendChip(chip) {
    //       return chip;
    //     }

    //     /**
    //      *
    //      * @param query
    //      * @returns {*}
    //      */
    //     function keywordSearch(query) {
    //       var results = query ? vm.keywords.filter(createFilterForKeyword(query)) : vm.keywords;
    //       return results;
    //     }

    //     /**
    //      *
    //      * @param query
    //      * @returns {Function}
    //      */

    //     function createFilterForKeyword(query) {
    //       var lowercaseQuery = angular.lowercase(query);
    //       return function filterFn(keyword) {
    //         return (keyword._lowername.indexOf(lowercaseQuery) === 0)
    //       };
    //     }

    //     /**
    //      *
    //      * @returns {Array}
    //      */

    //     function getKeywords() {
    //       var keyWords = [{
    //         id: 1,
    //         nombre: 'Ingeniería'
    //       }, {
    //         id: 2,
    //         nombre: 'Comercio'
    //       }, {
    //         id: 3,
    //         nombre: 'Inteligencia Artificial'
    //       }, {
    //         id: 4,
    //         nombre: 'Minería'
    //       }];

    //       return keyWords.map(function(keyword) {
    //         keyword._lowername = keyword.nombre.toLowerCase();
    //         return keyword;
    //       })
    //     }

    //     /**
    //      * Función para cargar estados y municipios
    //      */

    //     vm.estados = null;
    //     vm.loadEstados = loadEstados;
    //     vm.selectedEstado = null;
    //     vm.searchMunicipio = searchMunicipios;
    //     vm.searchEstados = searchEstados;

    //     function searchMunicipios(id) {
    //       var results = id ? vm.selectedEstado.municipios.filter(createFilterForMunicipios(id)) : vm.selectedEstado.municipios;
    //       return results;
    //     }

    //     function searchEstados(id) {
    //       if (vm.estados == null) {
    //         loadEstados();
    //       }
    //       var results = id ? vm.estados.filter(createFilterForEstados(id)) : vm.estados;
    //       return results;
    //     }

    //     function createFilterForEstados(id) {
    //       return function filterFn(estado) {
    //         var municipios = estado.municipios;

    //         var results = id ? municipios.filter(createFilterForMunicipios(id)) : municipios;

    //         if (results.length != 0) {
    //           return true;
    //         }
    //         return false;
    //       };
    //     }

    //     function createFilterForMunicipios(id) {

    //       return function filterFn(municipio) {
    //         return (municipio.id == id);
    //       };
    //     }

    //     function loadEstados() {

    //       var estados = [{
    //         id: 2,
    //         Clave: "02",
    //         Nombre: "Baja California",
    //         Abrev: "BC",
    //         idPais: 1,
    //         created_at: null,
    //         updated_at: null,
    //         municipios: [{
    //           id: 12,
    //           idEstado: 2,
    //           Clave: "001",
    //           Nombre: "Ensenada",
    //           Sigla: "",
    //           created_at: null,
    //           updated_at: null
    //         }, {
    //           id: 13,
    //           idEstado: 2,
    //           Clave: "002",
    //           Nombre: "Mexicali",
    //           Sigla: "",
    //           created_at: null,
    //           updated_at: null
    //         }]
    //       }, {
    //         id: 11,
    //         Clave: 11,
    //         Nombre: "Guanajuato",
    //         Abrev: "Gto.",
    //         idPais: 1,
    //         created_at: null,
    //         updated_at: null,
    //         municipios: [{
    //           id: 321,
    //           idEstado: 11,
    //           Clave: "001",
    //           Nombre: "Abasolo",
    //           Sigla: "",
    //           created_at: null,
    //           updated_at: null
    //         }, {
    //           id: 322,
    //           idEstado: 11,
    //           Clave: "002",
    //           Nombre: "Acámbaro",
    //           Sigla: "",
    //           created_at: null,
    //           updated_at: null
    //         }]
    //       }];

    //       vm.estados = estados;
    //     }

    activate();

    function activate() {
      vm.isEditing = false;
      vm.isCreating = false;

      vm.validations = [
      {
        field: 'isValidated',
        label: {
          success: 'Organización Validada',
          error: 'Organización no validada'
        }
      },{
        field: 'RFCValidated',
        label: {
          success: 'RFC Validado',
          error: 'RFC No Validado'
        }
      }, {
        field: 'RENIECyTValidated',
        label: {
          success: 'Validado por RENIECyT',
          error: 'Validado por RENIECyT'
        }
      }, {
        field: 'ActaValidated',
        label: {
          success: 'Acta Validada',
          error: 'Acta No Validada'
        }
      }];

      vm.org = {
        "id": 1,
        "Titulo": "Mi Organizacion",
        "Descripcion": "Una Nueva Organizacion",
        "Mision": "Ser la mejor organizacion",
        "RFC": "FARD921018",
        "Vision": "Seremos la mejor organizacion dentro de 20 a\u00f1os",
        "Giro": null,
        "DireccionFiscal": null,
        "idContacto": 1,
        "idMunicipio": 0,
        "RepresentanteLegal": "Chadwick Carreto Arellano",
        "RazonSocial": "Empresa S.A de C.V",
        "Archivos": null,
        "isValidated": 0,
        "RENIECyTValidated": 0,
        "RFCValidated": 0,
        "ActaValidated": 0,
        "created_at": "2016-01-28 06:39:17",
        "updated_at": "2016-01-28 06:39:17",
        "pivot": {
          "idPersona": 1,
          "idOrganizacion": 1,
          "Puesto": "CEO",
          "FechaInicio": "2014-01-01",
          "FechaTermino": null,
          "Owner": 1,
          "WritePermissions": 0
        }
      };

    }

  }
})();

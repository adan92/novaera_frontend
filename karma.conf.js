// Karma configuration
// Generated on Mon Feb 15 2016 15:12:06 GMT-0600 (CST)

var wiredep = require('wiredep');



module.exports = function(config) {
  var bowerDependencies = wiredep({
    directory: 'bower_components'
  });

  var additionalFiles = ["src/app/triangular/layouts/layouts.module.js","src/app/triangular/layouts/default/default-layout.controller.js","src/app/triangular/layouts/default/default-content.directive.js","src/app/triangular/components/components.module.js","src/app/triangular/components/wizard/wizard.directive.js","src/app/triangular/components/wizard/wizard-form.directive.js","src/app/triangular/components/widget/widget.directive.js","src/app/triangular/components/toolbars/toolbar.controller.js","src/app/triangular/components/table/table.directive.js","src/app/triangular/components/table/table-start-from.filter.js","src/app/triangular/components/table/table-cell-image.filter.js","src/app/triangular/components/notifications-panel/notifications-panel.controller.js","src/app/triangular/components/menu/menu.provider.js","src/app/triangular/components/menu/menu.directive.js","src/app/triangular/components/menu/menu.controller.js","src/app/triangular/components/menu/menu-item.directive.js","src/app/triangular/components/loader/loader.directive.js","src/app/triangular/components/loader/loader-service.js","src/app/triangular/components/footer/footer.controller.js","src/app/triangular/components/breadcrumbs/breadcrumbs.service.js","src/app/mainApp/proyectos/proyectos.module.js","src/app/mainApp/proyectos/controllers/validarProyectos.controller.js","src/app/mainApp/proyectos/controllers/validarArchivos.controller.js","src/app/mainApp/proyectos/controllers/trlTable.controller.js","src/app/mainApp/proyectos/controllers/trlProyectos.controller.js","src/app/mainApp/proyectos/controllers/revisarProyectosAdmin.controller.js","src/app/mainApp/proyectos/controllers/revisarProyectos.controller.js","src/app/mainApp/proyectos/controllers/resultadosProyectos.controller.js","src/app/mainApp/proyectos/controllers/registrarProyectos.controller.js","src/app/mainApp/proyectos/controllers/propiedadIntelectualProyectos.controller.js","src/app/mainApp/proyectos/controllers/modeloNegocioProyectos.controller.js","src/app/mainApp/proyectos/controllers/modalidadesProyectos.controller.js","src/app/mainApp/proyectos/controllers/inscribirProyecto.controller.js","src/app/mainApp/proyectos/controllers/indexProyectos.controller.js","src/app/mainApp/proyectos/controllers/impactoProyectos.controller.js","src/app/mainApp/proyectos/controllers/etapasProyectos.controller.js","src/app/mainApp/proyectos/controllers/ejecucionProyetos.controller.js","src/app/mainApp/proyectos/controllers/descriptorResultado.controller.js","src/app/mainApp/proyectos/controllers/descriptorProyecto.controller.js","src/app/mainApp/profile/profile.module.js","src/app/mainApp/profile/controllers/indexProfile.controller.js","src/app/mainApp/personas/personas.module.js","src/app/mainApp/personas/controllers/registrarPersonas.controller.js","src/app/mainApp/personas/controllers/indexPersonas.controller.js","src/app/mainApp/personas/controllers/descriptorPersonaAdmin.controller.js","src/app/mainApp/personas/controllers/descriptorPersona.controller.js","src/app/mainApp/organizaciones/organizaciones.module.js","src/app/mainApp/organizaciones/controllers/informacionOrganizaciones.controller.js","src/app/mainApp/organizaciones/controllers/indexOrganizaciones.controller.js","src/app/mainApp/organizaciones/controllers/descriptorOrganizacion.controller.js","src/app/mainApp/login/login.module.js","src/app/mainApp/login/controllers/register.controller.js","src/app/mainApp/login/controllers/logout.controller.js","src/app/mainApp/login/controllers/login.controller.js","src/app/mainApp/fondeos/fondeos.module.js","src/app/mainApp/fondeos/controllers/registrarFondeos.controller.js","src/app/mainApp/fondeos/controllers/modalidadFondeos.controller.js","src/app/mainApp/fondeos/controllers/indexFondeos.controller.js","src/app/mainApp/fondeos/controllers/descriptorFondeo.controller.js","src/app/mainApp/fondeos/controllers/convocatoriaFondeos.controller.js","src/app/mainApp/explotacionInformacion/explotacionInformacion.module.js","src/app/mainApp/explotacionInformacion/controllers/ExplotacionInformacioncontroller.js","src/app/mainApp/explotacionInformacion/controllers/ExplotacionInformacionQueryDescriptors.controller.js","src/app/mainApp/explotacionInformacion/controllers/ExplotacionInformacionEsp.controller.js","src/app/mainApp/descriptor/descriptor.module.js","src/app/mainApp/descriptor/controllers/tipoDescriptor.controller.js","src/app/mainApp/descriptor/controllers/indexDescriptor.controller.js","src/app/mainApp/admin/admin.module.js","src/app/mainApp/admin/controllers/indexAdmin.controller.js","src/app/triangular/themes/themes.module.js","src/app/triangular/themes/theming.provider.js","src/app/triangular/themes/skins.provider.js","src/app/triangular/profiler/profiler.module.js","src/app/triangular/profiler/profiler.config.js","src/app/triangular/triangular.module.js","src/app/triangular/layouts/layouts.provider.js","src/app/triangular/directives/directives.module.js","src/app/triangular/directives/theme-background.directive.js","src/app/triangular/directives/same-password.directive.js","src/app/triangular/directives/palette-background.directive.js","src/app/triangular/directives/countupto.directive.js","src/app/mainApp/proyectos/proyectos.config.js","src/app/mainApp/profile/profile.config.js","src/app/mainApp/personas/personas.config.js","src/app/mainApp/organizaciones/organizaciones.config.js","src/app/mainApp/login/login.config.js","src/app/mainApp/intro/intro.module.js","src/app/mainApp/intro/intro.controller.js","src/app/mainApp/intro/intro.config.js","src/app/mainApp/fondeos/fondeos.config.js","src/app/mainApp/filters/offset.filter.js","src/app/mainApp/explotacionInformacion/explotacionInformacion.config.js","src/app/mainApp/descriptor/descriptor.config.js","src/app/mainApp/admin/admin.config.js","src/app/triangular/triangular.run.js","src/app/triangular/settings.provider.js","src/app/triangular/config.route.js","src/app/app.module.js","src/app/services/user.service.js","src/app/services/translate.service.js","src/app/services/registroProyecto.service.js","src/app/services/proyecto.service.js","src/app/services/propiedadIntelectual.service.js","src/app/services/profile.service.js","src/app/services/catalogo.service.js","src/app/services/operation.service.js","src/app/services/customMenu.js","src/app/services/authService.service.js","src/app/services/authInterceptor.service.js","src/app/services/admin.service.js","src/app/mainApp/mainApp.module.js","src/app/value.googlechart.js","src/app/config.triangular.themes.js","src/app/config.triangular.settings.js","src/app/config.triangular.layout.js","src/app/config.translate.js","src/app/config.run.js","src/app/config.route.js","src/app/config.mdDateLocale.js","src/app/config.constants.js","src/app/config.chartjs.js"];

  var testFiles = ["test/spec/*.test.js"];


  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],



    // list of files / patterns to load in the browser
    files: bowerDependencies.js.concat(additionalFiles).concat(testFiles),

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],//['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

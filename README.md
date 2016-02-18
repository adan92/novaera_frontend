# Novaera frontend

Este proyecto está enfocado a la gestión de proyectos.  
### Version
1.0.0

### Tecnologías

Este proyecto fue desarrollando utilizando tecnologías como:

* [AngularJS] - Framework web usado para aplicaciones web
* [Triangular oxygenna] - Sorprendente tema hecho en Angular y Angular Material
* [node.js] - evented I/O for the backend
* [Gulp] - es un sistema de construcción que ayuda a minificar y detectar cambios en código 
* [Bower] - es un manejador de paquetes web.
* [Karma] - gestor de pruebas agnóstico al framework hecho por Google
* [Jasmine] - framework de pruebas unitarias

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Instalación local
Primero necesitas Gulp y Bower
```sh
$ npm install -g bower
$ npm install -g gulp
```
Posteriormente

```sh
$ git clone [git-repo-url] 
$ cd novaera_frontend
$ npm install
$ bower install
```

Cuando se hayan instalado las dependencias de Node y Bower
```sh
$ gulp serve
```

###Instalación mediante Vagrant

Requisitos:
* [vagrant] - Herramienta para la creación y configuración de entornos de desarrollo virtaulizados.
* [ssh] o [openssh] (Windows) - Protocolo que nos permite acceder a máquinas remotas a través de una red.
* [virtualbox] - Software de virtualización para arquitecturas x86/amd64

Una vez instalada cada una de las herramientas, se procede a lo siguiente:

Accedemos a la carpeta del proyecto y ejecutamos el comando
```sh
$ cd novaera_frontend
$ vagrant up
```

Este proceso tardará unos minutos en lo que descarga la imagen y en lo que se configura los elementos necesarios.

Terminado esto se necesita levantar el proyecto:
```sh
$ vagrant ssh
$ cd novaera_frontend
$ gulp serve
```

Para poder acceder al proyecto se accede mediante el navegador en la siguiente liga:
```http
http://11.12.13.14:3000/
```
### Testing

Para empezar a probar, se deben de generar los archivos en /test/spec y luego los siguientes comandos

```sh
$ gulp karma
$ karma start karma.conf.js
```

El primero anexará todos los archivos necesarios para correr el proyecto y el segundo iniciará las pruebas indicadas en
los archivos de testing


###Colaboradores:
-Daniel Zuriel Franco Rodríguez (https://github.com/LockonF)
-Francisco Javier Cerda Martinez (https://github.com/DarkXavier)
-Jorge Erik Montiel Arguijo (https://github.com/JRGRK)
-Amezcua Aguilar Christian Adan Israel (https://github.com/carson314)
-Santiago Sinisterra (https://github.com/sinisterra)

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [triangular oxygenna]: <http://triangular.oxygenna.com> 
   [node.js]: <http://nodejs.org> 
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [bower]: <http://bower.io/>
   [vagrant]: <https://www.vagrantup.com/>
   [ssh]:<http://support.suso.com/supki/SSH_Tutorial_for_Linux>
   [openssh]:<https://sourceforge.net/projects/sshwindows/>
   [virtualbox]:<https://www.virtualbox.org/>
   [Karma]: <https://karma-runner.github.io/>
   [Jasmine]: <http://jasmine.github.io/>


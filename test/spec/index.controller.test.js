/**
 * Created by lockonDaniel on 2/15/16.
 */
describe('Proyecto',function(){

    describe('Testing Index',function(){
        var IndexController, $scope, $httpBackend, Restangular,$mdThemingProvider;

        beforeEach(function(){
            module('app');
        });



        beforeEach(inject(function($controller, $rootScope, $filter, $injector, Restangular, $httpBackend){
            $scope = $rootScope.$new();
            $httpBackend = $httpBackend;
            Restangular = $injector.get("Restangular");
            IndexController = $controller("indexProyectosController",{
                $rootScope: $rootScope,
                $scope: $scope,
                $filter: $filter
            });

        }));

        it('Should clear vm.clickedProjects when clear() is called',inject(function(){
            IndexController.clear();
            expect(IndexController.clickedProjects).toBe(null);
        }));




    });


    describe('Testing Service',function(){
        var httpBackend, Restangular, TestUtils, q, scope;

        beforeEach(function(){
            module('app');
        });

        beforeEach(inject(function( _Restangular_, _$httpBackend_, _TestUtils_, $q, $rootScope) {
            httpBackend = _$httpBackend_;
            Restangular = _Restangular_;
            TestUtils = _TestUtils_;
            q = $q;
            scope = $rootScope.$new();
        }));

        spyOn(Restangular, 'one').andCallThrough();
        var mockToReturn = {
            someProp: 'someValue',
            someOtherProp: 'someOtherValue'
        };


    });




});
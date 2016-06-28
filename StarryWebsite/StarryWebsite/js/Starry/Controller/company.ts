//// <reference path="../../scripts/typings/_all.d.ts" />

module Starry {
    interface CompanyScope extends ng.IScope {
        companyScope: any;
    }

    export class CompanyController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: CompanyScope, $http: ng.IHttpService, $q: any) {
            //var userId = $routeParams.code;
            this.scope.companyScope = "dashboard";
        }
    }

    angular
        .module("Starry", [])
        .controller("CompanyController", CompanyController);
}
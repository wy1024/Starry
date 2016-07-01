/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface CompanySearchScope extends ng.IScope {
        someText: any;
    }

    class CompanySearchController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: CompanySearchScope, $http: ng.IHttpService, $q: any) {
            //var userId = $routeParams.code;
            this.scope.someText = "dashboard";
        }
    }

    App.controller("CompanySearchController", CompanySearchController);
}


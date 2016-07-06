/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface CompanySearchScope extends ng.IScope {
        someText: any;

        kolList: any;
    }

    class CompanySearchController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: CompanySearchScope, $http: ng.IHttpService, $q: any) {
            var self = this;

            this.scope.someText = "dashboard";

            $http.get('http://starrywebapi.azurewebsites.net/api/DatabaseApi/GetKolList')
                .then(function (res) {
                    self.scope.kolList = res.data;

                });
        }
    }

    App.controller("CompanySearchController", CompanySearchController);
}


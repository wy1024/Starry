/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface CompanySearchDetailsScope extends ng.IScope {
        someText: any;

        kolList: any;
    }

    class CompanySearchDetailsController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: CompanySearchDetailsScope, $http: ng.IHttpService, $q: any) {
            var self = this;

            this.scope.someText = "dashboard";

            $http.get('http://starrywebapi.azurewebsites.net/api/DatabaseApi/GetKolList')
                .then(function (res) {
                    self.scope.kolList = res.data;

                });
        }
    }

    App.controller("CompanySearchDetailsController", CompanySearchDetailsController);
}


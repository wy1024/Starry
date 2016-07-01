//// <reference path="../../scripts/typings/_all.d.ts" />

var App = angular.module("Starry", ["ngRoute"]);


module Starry {
    interface CompanyScope extends ng.IScope {
        companyScope: any;
    }

    export class CompanyController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: CompanyScope, $http: ng.IHttpService, $q: any) {
            this.scope.companyScope = "dashboard";
        }
    }

    App.controller("CompanyController", CompanyController)
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider
                    .when("/dashboard", {
                        templateUrl: "company-dashboard.html",
                        controller: "CompanySearchController as vm"
                    })
                    .when("/goal", {
                        templateUrl: "company-goal.html",
                        controller: "CompanySearchController as vm"
                    })
                    .when("/search", {
                        templateUrl: "company-search.html",
                        controller: "CompanySearchController as vm"
                    })
                    .when("/select", {
                        templateUrl: "company-select.html",
                        controller: "CompanySearchController as vm"
                    })
                    .when("/track", {
                        templateUrl: "company-track.html",
                        controller: "CompanySearchController as vm"
                    })
                    .when("/history", {
                        templateUrl: "company-history.html",
                        controller: "CompanySearchController as vm"
                    })
                    .when("/help", {
                        templateUrl: "company-help.html",
                        controller: "CompanySearchController as vm"
                    })
                    .when("/storeDetails/:storeId", {
                        templateUrl: "/templates/storeDetailView.html",
                        controller: "StoreDetailCtrl as vm"
                    })

                    .otherwise("");
            }
        ]);
}
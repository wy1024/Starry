//// <reference path="../../scripts/typings/_all.d.ts" />
var App = angular.module("Starry", ["ngRoute", "chart.js"]);
var Starry;
(function (Starry) {
    var CompanyController = (function () {
        function CompanyController(scope, $http, $q) {
            this.scope = scope;
            this.scope.companyScope = "dashboard";
        }
        CompanyController.$inject = ['$scope', '$http', '$q'];
        return CompanyController;
    }());
    Starry.CompanyController = CompanyController;
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
                controller: "CompanyTrackController as vm"
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
})(Starry || (Starry = {}));
//# sourceMappingURL=company.js.map
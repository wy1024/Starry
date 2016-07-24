//// <reference path="../../scripts/typings/_all.d.ts" />
var App = angular
    .module('Starry', ['ngRoute', 'ngCookies', 'chart.js']);
var Starry;
(function (Starry) {
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: "../company/company-dashboard.html",
            controller: "CompanyDashboardController as vm"
        })
            .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login.view.html',
            controllerAs: 'vm'
        })
            .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'register.view.html',
            controllerAs: 'vm'
        })
            .when("/dashboard", {
            templateUrl: "../company/company-dashboard.html",
            controller: "CompanyDashboardController as vm"
        })
            .when('/goal', {
            templateUrl: "../company/company-goal.html",
            //templateUrl: "companyViews/company-goal.html",
            controller: "CompanyGoalController as vm"
        })
            .when("/search", {
            templateUrl: "../company/company-search.html",
            controller: "CompanySearchController as vm"
        })
            .when("/select", {
            templateUrl: "../company/company-select.html",
            controller: "CompanySearchController as vm"
        })
            .when("/track", {
            templateUrl: "../company/company-track.html",
            controller: "CompanyTrackController as vm"
        })
            .when("/history", {
            templateUrl: "../company/company-history.html",
            controller: "CompanySearchController as vm"
        })
            .when("/help", {
            templateUrl: "../company/company-help.html",
            controller: "CompanySearchController as vm"
        })
            .when("/pol", {
            templateUrl: "../company/company-pol.html",
            controller: "CompanyPOLController as vm"
        })
            .otherwise({ redirectTo: '/login' });
    }
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
    App.config(config)
        .run(run);
})(Starry || (Starry = {}));
//# sourceMappingURL=app.js.map
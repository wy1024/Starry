var App = angular
    .module('Starry', ['ngRoute', 'ngCookies', 'chart.js']);
var Starry;
(function (Starry) {
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: "../kol/kol-dashboard.html",
            controller: "KolDashboardController as vm"
        })
            .when('/login', {
            controller: 'KolDashboardController',
            templateUrl: '../kol/kol-dashboard.html',
            controllerAs: 'vm'
        })
            .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'register.view.html',
            controllerAs: 'vm'
        })
            .when("/dashboard", {
            templateUrl: "../kol/company-dashboard.html",
            controller: "KolDashboardController as vm"
        })
            .when('/progress', {
            templateUrl: "../kol/kol-progress.html",
            controller: "KolProgressController as vm"
        })
            .when("/history", {
            templateUrl: "../kol/kol-history.html",
            controller: "KolHistoryController as vm"
        })
            .when("/help", {
            templateUrl: "../kol/kol-help.html",
            controller: "KolSearchController as vm"
        })
            .otherwise({ redirectTo: '/' });
    }
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
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

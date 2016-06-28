//// <reference path="../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var CompanyController = (function () {
        function CompanyController(scope, $http, $q) {
            this.scope = scope;
            //var userId = $routeParams.code;
            this.scope.companyScope = "dashboard";
        }
        CompanyController.$inject = ['$scope', '$http', '$q'];
        return CompanyController;
    }());
    Starry.CompanyController = CompanyController;
    angular
        .module("Starry", [])
        .controller("CompanyController", CompanyController);
})(Starry || (Starry = {}));
//# sourceMappingURL=company.js.map
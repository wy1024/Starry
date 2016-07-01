/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var CompanySearchController = (function () {
        function CompanySearchController(scope, $http, $q) {
            this.scope = scope;
            //var userId = $routeParams.code;
            this.scope.someText = "dashboard";
        }
        CompanySearchController.$inject = ['$scope', '$http', '$q'];
        return CompanySearchController;
    }());
    App.controller("CompanySearchController", CompanySearchController);
})(Starry || (Starry = {}));
//# sourceMappingURL=company-search.js.map
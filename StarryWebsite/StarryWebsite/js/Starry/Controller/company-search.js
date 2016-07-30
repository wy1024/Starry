/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var CompanySearchController = (function () {
        function CompanySearchController(scope, $http, $q) {
            this.scope = scope;
            var self = this;
            this.scope.someText = "dashboard";
            $http.get('http://starrywebapi.azurewebsites.net/api/DatabaseApi/GetKolList')
                .then(function (res) {
                self.scope.kolList = res.data;
            });
        }
        CompanySearchController.$inject = ['$scope', '$http', '$q'];
        return CompanySearchController;
    })();
    App.controller("CompanySearchController", CompanySearchController);
})(Starry || (Starry = {}));
//# sourceMappingURL=company-search.js.map
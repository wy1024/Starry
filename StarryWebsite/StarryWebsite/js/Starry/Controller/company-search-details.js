/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var CompanySearchDetailsController = (function () {
        function CompanySearchDetailsController(scope, $http, $q) {
            this.scope = scope;
            var self = this;
            this.scope.someText = "dashboard";
            $http.get('http://starrywebapi.azurewebsites.net/api/DatabaseApi/GetKolList')
                .then(function (res) {
                self.scope.kolList = res.data;
            });
        }
        CompanySearchDetailsController.$inject = ['$scope', '$http', '$q'];
        return CompanySearchDetailsController;
    })();
    App.controller("CompanySearchDetailsController", CompanySearchDetailsController);
})(Starry || (Starry = {}));
//# sourceMappingURL=company-search-details.js.map
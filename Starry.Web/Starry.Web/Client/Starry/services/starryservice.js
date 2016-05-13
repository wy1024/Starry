/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var StarryService = (function () {
        function StarryService($http) {
            this.$http = $http;
        }
        StarryService.prototype.check = function (address) {
            return null;
        };
        StarryService.$inject = ["$http"];
        return StarryService;
    })();
    angular
        .module("Starry")
        .service("StarryService", StarryService);
})(Starry || (Starry = {}));
//# sourceMappingURL=starryservice.js.map
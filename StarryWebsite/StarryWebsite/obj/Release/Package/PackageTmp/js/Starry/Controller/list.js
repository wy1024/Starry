//// <reference path="../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var ListController = (function () {
        function ListController(scope, $http, $q) {
            this.scope = scope;
            //var userId = $routeParams.code;
            this.scope.user_id = "111";
        }
        ListController.prototype.GetUrlParameter = function (sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        ;
        ListController.$inject = ['$scope', '$http', '$q'];
        return ListController;
    }());
    Starry.ListController = ListController;
    angular
        .module("Starry", [])
        .controller("ListController", ListController);
})(Starry || (Starry = {}));
//# sourceMappingURL=list.js.map
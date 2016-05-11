/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var UserController = (function () {
        function UserController(scope, $http) {
            this.scope = scope;
            //var userId = $routeParams.code;
            var self = this;
            var code = this.getUrlParameter('code');
            this.scope.code = "code is " + code;
            this.scope.loaded = false;
            var url = "http://starrywebapi.azurewebsites.net/api/Register/" + code;
            var getPriorities = $http.get(url)
                .then(function (res) {
                self.scope.data = res.data;
                self.scope.loaded = true;
            });
        }
        UserController.prototype.getUrlParameter = function (sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        ;
        UserController.$inject = ['$scope', '$http'];
        return UserController;
    })();
    Starry.UserController = UserController;
    angular
        .module("Starry")
        .controller("UserController", UserController);
})(Starry || (Starry = {}));
//# sourceMappingURL=user.js.map
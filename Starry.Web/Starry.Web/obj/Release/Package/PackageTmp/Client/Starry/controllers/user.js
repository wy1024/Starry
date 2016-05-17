/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var UserController = (function () {
        function UserController(scope, $http, $q) {
            this.scope = scope;
            //var userId = $routeParams.code;
            var self = this;
            var code = this.GetUrlParameter('code');
            this.scope.code = "code is " + code;
            this.scope.loaded = false;
            var register = this.RegisterUser($http, code);
            //if (localStorage.message == null) {
            //    localStorage.message = this.scope.data;
            //    scope.message = localStorage.message;
            //}
            $q.all([register]).then(function () {
                self.GetKeyMetrics(this.$http);
            });
        }
        UserController.prototype.RegisterUser = function ($http, code) {
            var self = this;
            var url = "http://starrywebapi.azurewebsites.net/api/Register/" + code;
            var register = $http.get(url)
                .then(function (res) {
                // Hack TODO remove substring
                self.scope.access_code = String(res.data).substring(2);
                ;
                //self.scope.loaded = true;
                // Get UserId
                url = "http://starrywebapi.azurewebsites.net/api/GetUserId/" + self.scope.access_code;
                $http.get(url)
                    .then(function (res) {
                    self.scope.user_id = res.data;
                });
            });
        };
        UserController.prototype.GetKeyMetrics = function ($http) {
            var self = this;
            var access_code = this.scope.access_code;
            var friends_url = "http://starrywebapi.azurewebsites.net/api/GetFollowers/" + access_code;
            var register = $http.get(friends_url)
                .then(function (res) {
                self.scope.access_code = res.data;
                self.scope.loaded = true;
            });
        };
        UserController.prototype.GetUrlParameter = function (sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        ;
        UserController.$inject = ['$scope', '$http', 'ngStorage', '$q'];
        return UserController;
    })();
    Starry.UserController = UserController;
    angular
        .module("Starry")
        .controller("UserController", UserController);
})(Starry || (Starry = {}));
//# sourceMappingURL=user.js.map
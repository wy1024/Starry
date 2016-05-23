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
            var url = "http://starrywebapi.azurewebsites.net/api/Register/" + code;
            var register = $http.get(url)
                .then(function (result) {
                result = String(result.data).substring(2);
                ;
                self.scope.access_code = result;
                url = "http://starrywebapi.azurewebsites.net/api/GetUserId/" + self.scope.access_code;
                return $http.get(url)
                    .then(function (result) {
                    self.scope.user_id = JSON.parse(String(result.data))["uid"];
                });
            });
            $q.all([register]).then(function () {
                self.GetKeyMetrics($http);
            });
            // Chart stuff
            this.scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            this.scope.series = ['Series A', 'Series B'];
            this.scope.chartData = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            this.scope.chartOptions = {};
            this.scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
        }
        UserController.prototype.GetKeyMetrics = function ($http) {
            var self = this;
            var access_code = this.scope.access_code;
            var user_id = this.scope.user_id;
            var timelineUrl = "http://starrywebapi.azurewebsites.net/api/GetPublicTimeline/" + access_code;
            var register = $http.get(timelineUrl)
                .then(function (res) {
                self.scope.data = res.data;
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
        UserController.$inject = ['$scope', '$http', '$q'];
        return UserController;
    })();
    Starry.UserController = UserController;
    angular
        .module("Starry", ["chart.js"])
        .controller("UserController", UserController);
})(Starry || (Starry = {}));
//# sourceMappingURL=user.js.map
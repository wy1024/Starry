/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface IRouteParams extends ng.route.IRouteParamsService {
        userId: string;
        code: string;
    }

    interface UserScope extends ng.IScope {
        code: any;
        access_code: any;
        user_id: any;

        data: any;

        friends: any;
        followers: any;

        userInfo: any;

        posts: any;
        comments: any;


        loaded: any;

        //message: any;
    }

    export class UserController {
        static $inject = ['$scope', '$http', '$q', 'chart.js'];

        constructor(public scope: UserScope, $http: ng.IHttpService, $q:any, $chartScope:any) {
            //var userId = $routeParams.code;
            var self = this;
            var code = this.GetUrlParameter('code');
            this.scope.code = "code is " + code;
            this.scope.loaded = false;


            var url = "http://starrywebapi.azurewebsites.net/api/Register/" + code;
            var register = $http.get(url)
                .then(result => {
                    result = String(result.data).substring(2);;
                    self.scope.access_code = result;
                    url = "http://starrywebapi.azurewebsites.net/api/GetUserId/" + self.scope.access_code;
                    return $http.get(url)
                        .then(result => {
                            self.scope.user_id = JSON.parse(String(result.data))["uid"];
                        });
                });


            $q.all([register]).then(function () {
                self.GetKeyMetrics($http);
            });


            $chartScope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $chartScope.series = ['Series A', 'Series B'];
            $chartScope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $chartScope.onClick = function (points, evt) {
                console.log(points, evt);
            };
        }

        GetKeyMetrics($http: ng.IHttpService) {
            var self = this;
            var access_code = this.scope.access_code;
            var user_id = this.scope.user_id;

            var timelineUrl = "http://starrywebapi.azurewebsites.net/api/GetPublicTimeline/" + access_code;
            var register = $http.get(timelineUrl)
                .then(function (res) {
                    self.scope.data = res.data;
                    self.scope.loaded = true;
                });
        }

        GetUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
    }

    angular
        .module("Starry")
        .controller("UserController", UserController);
}
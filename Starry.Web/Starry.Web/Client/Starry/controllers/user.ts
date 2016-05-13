/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface IRouteParams extends ng.route.IRouteParamsService {
        userId: string;
        code: string;
    }

    interface UserScope extends ng.IScope {
        code: any;
        access_code: any;

        friends: any;
        followers: any;

        userInfo: any;

        posts: any;
        comments: any;


        loaded: any;

        //message: any;
    }

    export class UserController {
        static $inject = ['$scope', '$http', 'ngStorage', '$q'];

        constructor(public scope: UserScope, $http: ng.IHttpService, $q:any) {
            //var userId = $routeParams.code;
            var self = this;
            var code = this.GetUrlParameter('code');
            this.scope.code = "code is " + code;
            this.scope.loaded = false;

            var url = "http://starrywebapi.azurewebsites.net/api/Register/" + code;
            var register = $http.get(url)
                .then(function (res) {
                    self.scope.access_code = res.data;
                    self.scope.loaded = true;
                });

            //if (localStorage.message == null) {
            //    localStorage.message = this.scope.data;
            //    scope.message = localStorage.message;
            //}

            $q.all([register]).then(function () {
                self.GetKeyMetrics(this.$http);
            });

        }

        GetKeyMetrics($http: ng.IHttpService) {
            var self = this;
            var access_code = this.scope.access_code;
            var friends_url = "http://starrywebapi.azurewebsites.net/api/GetFollowers/" + access_code;
            var register = $http.get(friends_url)
                .then(function (res) {
                    self.scope.access_code = res.data;
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
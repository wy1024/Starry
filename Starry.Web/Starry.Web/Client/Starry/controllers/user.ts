/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface IRouteParams extends ng.route.IRouteParamsService {
        userId: string;
        code: string;
    }

    interface UserScope extends ng.IScope {
        code: any;
        data: any;
        loaded: any;
    }

    export class UserController {
        static $inject = ['$scope', '$http'];

        constructor(public scope: UserScope, $http: ng.IHttpService) {
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

        getUrlParameter(sParam) {
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
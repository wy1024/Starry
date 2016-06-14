//// <reference path="../../scripts/typings/_all.d.ts" />

module Starry {
    interface ListScope extends ng.IScope {
        // Register information
        code: any;
        access_code: any;
        user_id: any;
    }

    interface UserInfo {
        statuses_count: number;
        created_at: string;
    }


    export class ListController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: ListScope, $http: ng.IHttpService, $q: any) {
            //var userId = $routeParams.code;
            this.scope.user_id = "111";
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
        .module("Starry", [])
        .controller("ListController", ListController);
}
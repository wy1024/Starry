/// <reference path="../../../scripts/typings/_all.d.ts" />


module Starry {
    export interface IStarryService {
        check(address: string): ng.IPromise<{}>;
    }

    class StarryService implements IStarryService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
        }

        check(address: string): ng.IPromise<{}> {
            return null;
        }
    }

    angular
        .module("Starry")
        .service("StarryService", StarryService);
}
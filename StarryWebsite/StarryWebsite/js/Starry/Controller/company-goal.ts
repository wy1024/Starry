/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface CompanyGoalScope extends ng.IScope {
        vm: any;

        // Goal details
        campaignName: any;
        length: any;
        view: any;
        click: any;
        demography: any;
        tags: any;
    }

    class CompanyGoalController {
        static $inject = ['$scope'];

        constructor(public scope: CompanyGoalScope) {
            var self = this;
            this.scope.vm = this;


        }

        submit() {
            // do something to submit form
            console.log('submit');
            console.log(this.scope.campaignName);
            console.log(this.scope.length);
        }

    }

    App.controller("CompanyGoalController", CompanyGoalController);
}


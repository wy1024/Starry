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

        // Global stuff
        $http: any;
        rootScope: any;
    }

    class CompanyGoalController {
        static $inject = ['$scope', '$http', '$rootScope', 'UserService'];

        constructor(public scope: CompanyGoalScope, $http: any, rootScope: ng.IRootScopeService) {
            var self = this;
            this.scope.vm = this;

            // Global stuff
            this.scope.$http = $http;
            this.scope.rootScope = rootScope;

        }

        submit() {
            var user_id = this.scope.rootScope.globals.currentUser.username;

            // do something to submit form
            var goal = {};
            goal["CompanyUserId"] = user_id;
            goal["CampaignName"] = this.scope.campaignName;
            goal["Length"] = this.scope.length;
            goal["View"] = this.scope.view;
            goal["Click"] = this.scope.click;
            goal["Demography"] = JSON.stringify(this.scope.demography);
            goal["Tags"] = JSON.stringify(this.scope.tags);
            console.log(goal);
            this.scope.$http.post('http://localhost:59208/' + 'api/DatabaseApi/AddNewCompanyGoal', goal);
        }

    }

    App.controller("CompanyGoalController", CompanyGoalController);
}


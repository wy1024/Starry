/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var CompanyGoalController = (function () {
        function CompanyGoalController(scope, $http, rootScope) {
            this.scope = scope;
            var self = this;
            this.scope.vm = this;
            // Global stuff
            this.scope.$http = $http;
            this.scope.rootScope = rootScope;
        }
        CompanyGoalController.prototype.submit = function () {
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
            //this.scope.$http.post('http://localhost:59208/' + 'api/DatabaseApi/AddNewCompanyGoal', goal);
            this.scope.$http.post('http://starrywebapi.azurewebsites.net/' + 'api/DatabaseApi/AddNewCompanyGoal', goal);
        };
        CompanyGoalController.$inject = ['$scope', '$http', '$rootScope', 'UserService'];
        return CompanyGoalController;
    })();
    App.controller("CompanyGoalController", CompanyGoalController);
})(Starry || (Starry = {}));
//# sourceMappingURL=company-goal.js.map
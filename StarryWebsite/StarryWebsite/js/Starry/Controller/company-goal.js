/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var CompanyGoalController = (function () {
        function CompanyGoalController(scope) {
            this.scope = scope;
            var self = this;
            this.scope.vm = this;
        }
        CompanyGoalController.prototype.submit = function () {
            // do something to submit form
            console.log('submit');
            console.log(this.scope.campaignName);
            console.log(this.scope.length);
        };
        CompanyGoalController.$inject = ['$scope'];
        return CompanyGoalController;
    }());
    App.controller("CompanyGoalController", CompanyGoalController);
})(Starry || (Starry = {}));
//# sourceMappingURL=company-goal.js.map
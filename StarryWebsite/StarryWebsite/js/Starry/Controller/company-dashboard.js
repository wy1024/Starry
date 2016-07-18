/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var CompanyDashboardController = (function () {
        function CompanyDashboardController(scope, rootScope, userService) {
            this.scope = scope;
            var self = this;
            this.initController(rootScope, userService);
        }
        CompanyDashboardController.prototype.initController = function (rootScope, userService) {
            this.loadCurrentUser(rootScope, userService);
        };
        CompanyDashboardController.prototype.loadCurrentUser = function ($rootScope, userService) {
            var self = this;
            userService.GetNameByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                console.log(user);
                self.scope.user = user;
            });
        };
        CompanyDashboardController.$inject = ['$scope', '$rootScope', 'UserService'];
        return CompanyDashboardController;
    }());
    App.controller("CompanyDashboardController", CompanyDashboardController);
})(Starry || (Starry = {}));
//# sourceMappingURL=company-dashboard.js.map
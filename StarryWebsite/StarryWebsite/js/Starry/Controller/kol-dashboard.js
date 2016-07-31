/// <reference path="../../../scripts/typings/_all.d.ts" />
var Starry;
(function (Starry) {
    var KolDashboardController = (function () {
        function KolDashboardController(scope, rootScope, userService) {
            this.scope = scope;
            var self = this;
            this.initController(rootScope, userService);
        }
        KolDashboardController.prototype.initController = function (rootScope, userService) {
            this.loadCurrentUser(rootScope, userService);
        };
        KolDashboardController.prototype.loadCurrentUser = function ($rootScope, userService) {
            var self = this;
            //userService.GetNameByUsername($rootScope.globals.currentUser.username)
            //    .then(function (user) {
            //        console.log(user);
            //        self.scope.user = user;
            //    });
        };
        KolDashboardController.$inject = ['$scope', '$rootScope', 'UserService'];
        return KolDashboardController;
    })();
    App.controller("KolDashboardController", KolDashboardController);
})(Starry || (Starry = {}));
//# sourceMappingURL=kol-dashboard.js.map
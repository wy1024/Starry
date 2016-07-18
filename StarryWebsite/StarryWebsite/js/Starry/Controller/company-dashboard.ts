/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface CompanyDashboardScope extends ng.IScope {
        user: any;
    }

    class CompanyDashboardController {
        static $inject = ['$scope', '$rootScope', 'UserService'];

        constructor(public scope: CompanyDashboardScope, rootScope: ng.IRootScopeService, userService: any) {
            var self = this;

            this.initController(rootScope, userService);

        }

        initController(rootScope, userService) {
            this.loadCurrentUser(rootScope, userService);
        }

        loadCurrentUser($rootScope, userService) {
            var self = this;
            userService.GetNameByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    console.log(user);
                    self.scope.user = user;
                });
        }

    }

    App.controller("CompanyDashboardController", CompanyDashboardController);
}


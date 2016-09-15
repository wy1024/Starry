﻿(function () {
    'use strict';

    angular
        .module('Starry')
        .controller('KolRegisterController', RegisterController);

    RegisterController.$inject = ['KolUserService', '$location', '$rootScope', 'KolFlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    console.log(response);
                    if (response.success) {
                        FlashService.Success('注册成功', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error('用户名已存在');
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();

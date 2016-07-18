(function () {
    'use strict';

    angular
        .module('Starry')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q', '$timeout'];
    function UserService($http, $q, $timeout) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetNameByUsername = GetNameByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        var apiUrl = 'http://localhost:59208/';

        function GetAll() {
            return $http.get(apiUrl + '/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(apiUrl + '/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        // Checks whether username exists or not
        function GetByUsername(username) {
            return $http.get('http://localhost:59208/' + 'api/DatabaseApi/GetCompanyUserByUsername/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function GetNameByUsername(username) {
            return $http.get('http://localhost:59208/' + 'api/DatabaseApi/GetCompanyNameByUsername/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            var deferred = $q.defer();

            var promise =
                $timeout(function () {
                    GetByUsername(user.username)
                        .then(function (userExists) {
                            if (userExists === 'true') {
                                deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                            } else {
                                return $http.post('http://localhost:59208/' + 'api/DatabaseApi/AddNewCompanyUser', user);
                            }
                        }).then(function (response2) {
                            deferred.resolve({ success: true });
                        });
                }, 1000);

            return deferred.promise;            
        }

        //TODO
        function Update(user) {
            return $http.put(apiUrl + '/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(apiUrl + '/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();

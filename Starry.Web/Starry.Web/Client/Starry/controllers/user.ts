/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface IRouteParams extends ng.route.IRouteParamsService {
        userId: string;
        code: string;
    }

    interface UserScope extends ng.IScope {
        // Register information
        code: any;
        access_code: any;
        user_id: any;

        // API information
        data: any;
        followers: any;
        activeFollowers: any;
        userInfo: any;
        

        // todo stuff - not used yet
        friends: any;
        posts: any;
        comments: any;

        // Computed info
        computedUserInfo: UserInfo;
        computedFollowers: FollowersStruct;


        // Loaded or not check
        loaded: any;
        

        // Chart stuff
        labels: any;
        series: any;
        chartData: any;
        chartOptions: any;
        onClick: any;
    }

    interface UserInfo {
        name: string;
        location: string;
        avatar_large: string;
        followers_count: number;
        friends_count: number;
        statuses_count: number;
        created_at: string;
    }

    interface FollowersStruct {
        numberOfFollowers: number;
        sample_users: {};
    }



    export class UserController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: UserScope, $http: ng.IHttpService, $q:any) {
            //var userId = $routeParams.code;
            var self = this;
            var code = this.GetUrlParameter('code');
            this.scope.code = "code is " + code;
            this.scope.loaded = false;


            //var url = "http://starrywebapi.azurewebsites.net/api/Register/" + code;
            //var register = $http.get(url)
            //    .then(result => {
            //        result = String(result.data).substring(2);;
            //        self.scope.access_code = result;
            //        url = "http://starrywebapi.azurewebsites.net/api/GetUserId/" + self.scope.access_code;
            //        return $http.get(url)
            //            .then(result => {
            //                self.scope.user_id = JSON.parse(String(result.data))["uid"];
            //                self.GetKeyMetrics($http, $q);
            //            });
            //    });

            // Test Mode
            self.scope.access_code = "00pp4wDCYYNKtC156eebd95b7nnvIC";
            self.scope.user_id = "1890509321";
            self.GetKeyMetrics($http, $q);


            // Chart stuff
            this.scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            this.scope.series = ['Series A', 'Series B'];
            this.scope.chartData = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            this.scope.chartOptions = {};
            this.scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
        }

        GetKeyMetrics($http: ng.IHttpService, $q :any) {
            var self = this;
            var access_code = this.scope.access_code;
            var user_id = this.scope.user_id;

            var timelineUrl = "http://starrywebapi.azurewebsites.net/api/GetPublicTimeline/" + access_code;
            var getTimeline = $http.get(timelineUrl)
                .then(function (res) {
                    self.scope.data = res.data;
                    self.scope.loaded = true;
                });

            var followersUrl = "http://starrywebapi.azurewebsites.net/api/GetFollowers/" + access_code + "/" + user_id;
            var getFollowers = $http.get(followersUrl)
                .then(function (res) {
                    self.scope.followers = JSON.parse(String(res.data));

                    var followersStruct: FollowersStruct;
                    followersStruct.numberOfFollowers = self.scope.followers.total_number;

                    // Get sample followers
                    var sampleUsersList = {};
                    for (var i = 0; i < 3; i++) {
                        var sample_users = self.scope.followers.users[i];
                        sampleUsersList[i] = {};
                        sampleUsersList[i]["name"] = sample_users.name;
                        sampleUsersList[i]["followers_count"] = sample_users.followers_count;
                        sampleUsersList[i]["avatar_large"] = sample_users.avatar_large;
                    }
                    followersStruct.sample_users = sampleUsersList;
                    self.scope.computedFollowers = followersStruct;
                });

            //var activeFollowersUrl = "http://starrywebapi.azurewebsites.net/api/GetActiveFollowers/" + access_code + "/" + user_id;
            //var getActiveFollowers = $http.get(activeFollowersUrl)
            //    .then(function (res) {
            //        self.scope.activeFollowers = JSON.parse(String(res.data));
            //    });

            var userInfoUrl = "http://starrywebapi.azurewebsites.net/api/GetUserInfo/" + access_code + "/" + user_id;
            var getUserInfo = $http.get(userInfoUrl)
                .then(function (res) {
                    var userInfo = JSON.parse(String(res.data));
                    self.scope.userInfo = userInfo;
                    self.scope.computedUserInfo.avatar_large = userInfo.avatar_large;
                    self.scope.computedUserInfo.created_at = userInfo.created_at;
                    self.scope.computedUserInfo.followers_count = userInfo.followers_count;
                    self.scope.computedUserInfo.friends_count = userInfo.friends_count;
                    self.scope.computedUserInfo.location = userInfo.location;
                    self.scope.computedUserInfo.name = userInfo.name;
                    self.scope.computedUserInfo.statuses_count = userInfo.statuses_count;
                });

            $q.all([getTimeline, getFollowers, getUserInfo]).then(function () {
                self.scope.loaded = true;
            });
        }
        

        GetUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
    }

    angular
        .module("Starry", ["chart.js"])
        .controller("UserController", UserController);
}
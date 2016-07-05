/// <reference path="../../../scripts/typings/_all.d.ts" />

module Starry {
    interface CompanyTrackScope extends ng.IScope {
        // graph
        labels: any;
        series: any;
        data: any;
        options: any;
        colors: any;
        // cost graph
        series2: any;
        data2: any;
    }

    class CompanyTrackController {
        static $inject = ['$scope', '$http', '$q'];

        constructor(public scope: CompanyTrackScope, $http: ng.IHttpService, $q: any) {

            this.scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
            this.scope.series = ['流量人数', '点击量'];
            this.scope.data = [
                [1201, 2500, 3090, 4500, 5000, 5400],
                [200, 400, 780, 1024, 1423, 2025],
            ];
            this.scope.options = {
                legend: {
                    display: true
                }
            };
            this.scope.colors = ["#3399ff", "#ff9900"];

            this.scope.series2 = ['花费 $'];
            this.scope.data2 = [
                [500, 1200, 1390, 2000, 4000, 4300]
            ]
        }
    }

    App.controller("CompanyTrackController", CompanyTrackController);
}


angular.module('landing', [
    'ngRoute',
    'ngMessages'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/landing/:landingPageName', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: "about.tpl.html"
        })
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: "search.tpl.html",
            controller: "SearchPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/api', {
            templateUrl: "api.tpl.html",
            controller: "StaticPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/hot/:topic?', {
            templateUrl: "hot.tpl.html",
            controller: "HotPageCtrl"
        })
    })






    .controller("HotPageCtrl", function ($scope,
                                         $routeParams,
                                         $http,
                                             $location,
                                             $timeout) {


        loadHotData()


        function selectPapers(topic, audience, is_oa){

            // find the first papers facet that matches
            // all the supplied filters.

            // uses the global hotnessData variable initialized in app.js,
            // and filled from an API call upon app boot.
            return global.hotData.list.find(function(group){


                // test to see if this group is a match for the
                // set of filters we've been given.
                var matches = [
                    group.filter_discipline === topic,
                    group.filter_audience === audience,
                    group.filter_open === is_oa
                ]

                // all of the filter conditions matched.
                // returning true means that we'll end up using the
                // papers in this group.
                return matches.indexOf(false) < 0; // no false, all true.

            })
        }


        // loads from cache if possible. if cache empty, loads
        // from server and fills cache.
        function loadHotData(){
            if (global.hotData){
                $scope.papers = selectPapers(null, null, null)
            }
            else {
                $http.get("https://api.paperbuzz.org/v0/hot/2017/week-37")
                    .success(function(resp){
                        console.log("got response back from server", resp)
                        global.hotData = resp

                        // this time it will get the data from the cache.
                        loadHotData()
                    })

            }
        }








        $scope.edition = {
            year: 2017,
            week: 38
        }



    })


    .controller("LandingPageCtrl", function ($scope,
                                             $location,
                                             $timeout) {

        $scope.main = {}
        $scope.global.pageName = "landing"

        console.log("i am the landing page ctrl")
        $scope.submit = function(){
            console.log("submit!", $scope.main.id)
            $location.path("/details/" + $scope.main.id)
        }

    })


    .controller("SearchPageCtrl", function ($scope,
                                             $location,
                                             $timeout) {

        $scope.main = {}

        console.log("Search Page page ctrl")
        $scope.submit = function(){
            console.log("submit!", $scope.main.id)
            $location.path("/details/" + $scope.main.id)
        }

    })


    .controller("StaticPageCtrl", function ($scope,
                                             $location,
                                             $timeout) {

        $scope.main = {}
        console.log("Static Page ctrl")

    })



    .config(function ($routeProvider) {
        $routeProvider.when('/page-not-found', {
            templateUrl: "page-not-found.tpl.html",
            controller: "PageNotFoundCtrl"
        })
    })

    .controller("PageNotFoundCtrl", function($scope){
        console.log("PageNotFound controller is running!")

    })










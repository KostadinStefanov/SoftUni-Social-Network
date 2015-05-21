'use strict';

app.controller('HomeController',
    function HomeController($scope, accountService, userService, notification, $routeParams) {
        var feedStartPostId;

        $scope.accountService = accountService;
        $scope.posts = [];

        $scope.logout = function(){
            accountService.logout();
        }


        $scope.loadUserWall = function(){
            if(accountService.isLoggedIn()) {
                if ($scope.busy){
                    return;
                }
                $scope.busy = true;

                userService.getUserWall($routeParams['username'],  feedStartPostId).$promise.then(
                    function (data) {
                        $scope.posts = $scope.posts.concat(data);
                        if($scope.posts.length > 0){
                            feedStartPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                        $scope.busy = false;
                    },
                    function (error) {
                        notification.showError("Error loading user wall!", error);
                    }
                );
            }
        };

    }
);
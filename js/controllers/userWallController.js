'use strict';

app.controller('userWallController',
    function userWallController($scope, $log, accountService, userService, notification, $routeParams) {

        var feedStartPostId = 0,
            PAGE_SIZE =5;

        $scope.posts = [];

        $scope.isLogged = function(){
            return accountService.isLoggedIn();
        };

        $scope.getWallOwner = function () {
            if (accountService.isLoggedIn()) {
                userService.getUserFullData($routeParams['username']).$promise.then(
                    function (data) {
                        $scope.wallOwner = data;
                        if (accountService.getCurrentUser().userName !== $scope.wallOwner.username) {
                            if (data.isFriend) {
                                $scope.wallOwner.status = 'friend';
                            } else if (data.hasPendingRequest) {
                                $scope.wallOwner.status = 'pending';
                            } else {
                                $scope.wallOwner.status = 'invite';
                            }
                        }

                        //  if ($scope.wallOwner.isFriend && $location.path() === '/user/' + $routeParams['username'] + '/wall/') {
                        //      $scope.getUserFriendsListPreview();
                        //  }

                        //  if (!$scope.wallOwner.isFriend && $routeParams['username'] !== $scope.username && $location.path() === '/user/' + $routeParams['username'] + '/friends/') {
                        //        $location.path('/');
                        //     }
                    },
                    function (error) {
                        notification.showError("Unsuccessful user load!", error);
                    }
                );
            }
        };


        userService.getUserWall($routeParams['username'], PAGE_SIZE, feedStartPostId).$promise.then(
            function (data) {
                console.log(data)
                $scope.posts = $scope.posts.concat(data);

                if($scope.posts.length > 0){
                    feedStartPostId = $scope.posts[$scope.posts.length - 1].id;
                }
            },
            function (error) {
                notification.showError("Failed to load user wall!", error);
            }
        );



        userService.getUserFriendsPreview($routeParams['username']).$promise.then(
            function (data) {
                data.userFriendsUrl = '#/user/' + $routeParams['username'] + '/friends/';
                $scope.userFriendsListPreview = data;
            },
            function (error) {
                notification.showInfo("Loading user friends...", error);
            }
        );

        $scope.getUserFriends = function(){
            userService.getUserFriends($routeParams['username']).$promise.then(
                function (data) {
                    $scope.friendsList = data;
                },
                function (error) {
                    notification.showError("Failed to load user friends!", error);
                }
            );
        };


    });
'use strict';

app.controller('userWallController',
    function userWallController($scope, $location, accountService, userService, notification, $routeParams, postService, profileService) {

        var feedStartPostId = 0,
            PAGE_SIZE = 5;

        $scope.posts = [];
        $scope.postData = {};
        $scope.commentData = {};

        $scope.isLogged = function () {
            return accountService.isLoggedIn();
        };


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
            },
            function (error) {
                notification.showError("Unsuccessful user load!", error);
            }
        );

        userService.getUserWall($routeParams['username'], PAGE_SIZE, feedStartPostId).$promise.then(
            function (data) {
                $scope.posts = $scope.posts.concat(data);

                if ($scope.posts.length > 0) {
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

        userService.getUserFriends($routeParams['username']).$promise.then(
            function (data) {
                $scope.friendsList = data;
            },
            function (error) {
                notification.showError("Failed to load user friends!", error);
            }
        );

        $scope.sendFriendRequest = function(username){
            profileService.sendFriendRequest(username).$promise.then(
                function(data){
                    $scope.pendingRequests = data;
                    notification.showInfo("Friend request successfully send.");
                    $location.path('/');
                }, function(error){
                    notification.showError("Unsuccessful request send!", error);
                }
            );
        };

        $scope.addPost = function () {
            $scope.postData.username = $routeParams['username'];
            postService.addPost($scope.postData).$promise.then(
                function (data) {
                    $scope.postData.postContent = "";
                    $scope.posts.unshift(data);
                    notification.showInfo("Post successfully added.");
                },
                function (error) {
                    $scope.postData.postContent = "";
                    notification.showError("Failed to add post!", error);
                }
            );
        };


    }
);
'use strict';

app.controller('HomeController',
    function HomeController($scope, accountService, userService, notification, $routeParams, $timeout,
                            profileService, $location, postService, commentService) {

        var feedStartPostId = 0,
            PAGE_SIZE = 5;

        $scope.accountService = accountService;
        $scope.posts = [];
        $scope.commentData = {};
        $scope.passwordUpdate = {};

        $scope.logout = function () {
            userService.logout();
            accountService.logout()
        }

        $scope.isLogged = function () {
            return accountService.isLoggedIn();
        };

        profileService.me().$promise.then(
            function (data) {
                $scope.me = data;
            },
            function (error) {
                notification.showError("Failed to load user details!", error)
            }
        );

        profileService.getNewsFeed(PAGE_SIZE, feedStartPostId).$promise.then(
            function (data) {
                $scope.posts = $scope.posts.concat(data);
                if ($scope.posts.length > 0) {
                    feedStartPostId = $scope.posts[$scope.posts.length - 1].id;
                }
            },
            function (error) {
                notification.showError("Error loading news feed!", error);
            }
        );

        $scope.searchUser = function () {
            if (accountService.isLoggedIn() && $scope.searchTerm.trim() !== "") {
                userService.searchUser($scope.searchTerm).$promise.then(
                    function (data) {
                        $scope.searchResults = data;
                    },
                    function (error) {
                        notification.showError("Error loading news feed!", error);
                    }
                );
            } else {
                $scope.searchResults = undefined;
            }
        };


        $scope.getOwnFiendsList = function () {
            profileService.getFriendsList().$promise.then(
                function (data) {
                    $scope.friendsList = data;
                    notification.showInfo("friendsList successfully loaded");
                },
                function () {
                    notification.showInfo(" loading friends...");
                }
            );
        };

        $scope.getOwnFriendsListPreview = function () {
            profileService.getFriendsListPreview().$promise.then(
                function (data) {
                    data.userFriendsUrl = '#/user/' + $scope.username + '/friends/';
                    $scope.myFriendsListPreview = data;
                },
                function (error) {
                    notification.showError("Failed to load friends", error);
                }
            );
        }

        $scope.getFriendRequests = function () {
            profileService.getPendingRequests().$promise.then(
                function (data) {
                    $scope.pendingRequests = data;
                }
            );
        };


        $scope.acceptFriendRequest = function (request) {
            profileService.acceptRequest(request.id).$promise.then(
                function () {
                    var index = $scope.pendingRequests.indexOf(request);
                    $scope.pendingRequests.splice(index, 1);
                    notification.showInfo("Friend request successfully accepted.");
                }, function (error) {
                    notification.showError("Unsuccessful request accept!", error);
                }
            );
        };

        $scope.rejectFriendRequest = function (request) {
            profileService.rejectRequest(request.id).$promise.then(
                function () {
                    var index = $scope.pendingRequests.indexOf(request);
                    $scope.pendingRequests.splice(index, 1);
                    notification.showInfo("Friend request successfully rejected.");
                }, function (error) {
                    notification.showError("Unsuccessful request reject!", error);
                }
            );
        };

        $scope.clearSearchResults = function () {
            $timeout(function () {
                $scope.searchResults = undefined;
                $scope.searchTerm = "";
            }, 300);
        };

        $scope.editPassword = function () {
            profileService.changePassword($scope.passwordUpdate).$promise.then(
                function () {
                    notification.showInfo('Password successfully changed.');
                    $location.path('/');
                },
                function (error) {
                    notification.showError('Failed to change password!', error);
                }
            );
        };

// Post and comment functionality

        $scope.editPost = function (post) {
            postService.editPost(post.id, post.newPostContent).$promise.then(
                function () {
                    post.postContent = post.newPostContent;
                    notification.showInfo("Post successfully edited.");
                },
                function (error) {
                    notification.showError("Failed to edit post!", error);
                }
            );
        };

        $scope.deletePost = function (post) {
            postService.removePost(post.id).$promise.then(
                function () {
                    var index = $scope.posts.indexOf(post);
                    $scope.posts.splice(index, 1);
                    notification.showInfo("Post successfully deleted.");
                },
                function (error) {
                    notification.showError("Failed to delete post!", error);
                }
            );
        };

        $scope.likePost = function (post) {
            postService.like(post.id).$promise.then(
                function () {
                    notification.showInfo("Post successfully liked.");
                    post.liked = true;
                    post.likesCount++;
                },
                function (error) {
                    notification.showError("Failed to like post!", error);
                }
            );
        };

        $scope.unlikePost = function (post) {
            postService.unlike(post.id).$promise.then(
                function () {
                    notification.showInfo("Post successfully unliked.");
                    post.liked = false;
                    post.likesCount--;
                },
                function (error) {
                    notification.showError("Failed to unlike post!", error);
                }
            );
        };

        $scope.addComment = function (post) {
            commentService.addComment(post.id, $scope.commentData).$promise.then(
                function (data) {
                    $scope.commentData.commentContent = "";
                    post.comments.unshift(data);
                    post.totalCommentsCount++;
                    notification.showInfo("Comment successfully added.");
                },
                function (error) {
                    notification.showError("Failed to add comment!", error);
                }
            );
        };


    }
);
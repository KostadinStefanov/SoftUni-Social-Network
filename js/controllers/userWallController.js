'use strict';

app.controller('userWallController',
    function userWallController($scope, $log, accountService, userService, notification, $routeParams, postService, commentService) {

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
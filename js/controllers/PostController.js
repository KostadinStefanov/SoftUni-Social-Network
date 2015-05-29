'use strict';

app.controller('PostController',
    function HomeController($scope, accountService, userService, notification,
                            profileService, $location, postService, commentService) {

        if (accountService.isLoggedIn()) {
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
// Post and comment functionality

    }
);
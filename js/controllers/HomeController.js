'use strict';

app.controller('HomeController',
    function HomeController($scope, $log, accountService, userService, notification, $routeParams, $timeout) {
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

        $scope.searchUser = function(){
            if(accountService.isLoggedIn() && $scope.searchTerm.trim() !== ""){
                userService.searchUser($scope.searchTerm).$promise.then(
                    function(data){
                        //console.log(data);
                        $scope.searchResults = data;
                    },
                    function(error, status){
                        $log.warn(status, error);
                    }
                );
            } else {
                $scope.searchResults = undefined;
            }
        };

        $scope.clearSearchResults = function(){
            $timeout(function() {
                $scope.searchResults = undefined;
                $scope.searchTerm = "";
            }, 300);
        };

        $scope.uploadProfileImage = function(event){
            var file = event.target.files[0],
                reader;

            if(!file.type.match(/image\/.*/)){
                $('.picture-preview').attr('src', '');
                $scope.me.profileImageData = undefined;
                notification.showError("Invalid file format.");
            } else if(file.size > 131072) {
                $('.picture-preview').attr('src', '');
                $scope.me.profileImageData = undefined;
                notification.showError("File size limit exceeded.");
            } else {
                reader = new FileReader();
                reader.onload = function() {
                    $('.picture-preview').attr('src', reader.result);
                    $('#profile-image').attr('data-picture-data', reader.result);
                    $scope.me.profileImageData = reader.result;
                };
                reader.readAsDataURL(file);
            }
        };

    }
);
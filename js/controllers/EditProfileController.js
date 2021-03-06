"use strict";

app.controller("EditProfileController",
    ["$scope", "$location", "notification", "profileService",

        function ($scope, $location, notification, profileService) {

            profileService.me().$promise.then(
                function (data) {
                    $scope.profile = data;
                    console.log(data);
                    notification.showInfo("Successfully loaded user details !")
                },
                function (error) {
                    notification.showError("Failed to load user details!", error)
                }
            );
            $scope.editDetails = function (profile) {
                profile.profileImageData = profile.profileImageData.match(/^data:image\/(.+?);base64,(.+)$/i)[2];
                profileService.ProfileUpdate(profile).$promise.then(
                    function () {
                        notification.showInfo('Profile successfully edited.');
                        $location.path('/');
                    },
                    function (error) {
                        notification.showError('Failed to edit profile!', error);
                    }
                );
            }
        }]);
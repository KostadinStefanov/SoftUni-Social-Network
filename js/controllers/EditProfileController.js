"use strict";

app.controller( "EditProfile",
    [
        "$scope",

        function( $scope ) {
            $scope.profile = profileRepository.profile;
            $scope.createImage = image.appendBase64Header;

            $scope.editProfile = function() {
                var profilePhotoFileInput = document.getElementById( "profilePictureInput" ),
                    coverPhotoFileInput = document.getElementById( "coverPhotoInput" ),
                    profilePhoto = profilePhotoFileInput.files[ 0 ],
                    coverPhoto = coverPhotoFileInput.files[ 0 ];


                image.convertToBase64( profilePhoto, function( base64 ) {
                    $scope.profile.profilePhotoData = image.extractBase64Data( base64 );
                });

                image.convertToBase64( coverPhoto, function( base64 ) {
                    $scope.profile.coverPhotoData = image.extractBase64Data( base64 );
                });

                profileRepository.updateProfile().success(function( data ) {
                    console.log( data );
                });
            };
        }]);
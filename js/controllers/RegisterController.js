app.controller("RegisterController", ["$scope", "$location", "accountService", "notification",
    function ($scope, $location,  accountService, notification) {
        $scope.userData = {
        };

        $scope.register = function (userData) {
            console.log(userData)
            if (userData.password != userData.confirmPassword) {
                notification.showError("The passwords do not match.");
                return;
            }

            accountService.register(userData, function (data) {
                notification.showInfo("Registration successful.");
                $location.path("#/");
            }, function (error) {
                notification.showError("Registration unsuccessful", error);
            });
        }
    }]);

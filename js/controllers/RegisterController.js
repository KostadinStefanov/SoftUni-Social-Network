app.controller("RegisterController", ["$scope", "$location", "AccountService", "notification",
    function ($scope, $location,  AccountService, notification) {
        $scope.userData = {
        };

        $scope.register = function (userData) {
            console.log(userData)
            if (userData.password != userData.confirmPassword) {
                notification.showError("The passwords do not match.");
                return;
            }

            AccountService.register(userData, function (data) {
                notification.showInfo("Registration successful.");
                $location.path("#/");
            }, function (error) {
                notification.showError("Registration unsuccessful", error);
            });
        }
    }]);

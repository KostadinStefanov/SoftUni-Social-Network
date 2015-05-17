app.controller("RegisterController", ["$scope", "$location", "AccountService", "Notification",
    function ($scope, $location,  AccountService, Notification) {
        $scope.userData = {
        };

        $scope.register = function (userData) {
            if (userData.password != userData.confirmPassword) {
                Notification.showError("The passwords do not match.");
                return;
            }

            AccountService.register(userData, function (data) {
                Notification.showInfo("Registration successful.");
                $location.path("#/");
            }, function (error) {
                Notification.showError("Registration unsuccessful", error);
            });
        }
    }]);

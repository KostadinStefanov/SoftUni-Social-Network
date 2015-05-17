app.controller("LoginController", ["$scope", "AccountService", "NotificationService", "$location",
    function ($scope, AccountService, NotificationService, $location) {
        $scope.login = function (userData) {
            AccountService.login(userData, function (data) {
                Notification.showInfo("Login successful.");
                $location.path("#/");
            }, function (error) {
                Notification.showError("Login unsuccessful", error);
            });
        };
    }]);

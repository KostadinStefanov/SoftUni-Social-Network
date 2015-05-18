app.controller("LoginController", ["$scope", "AccountService", "$location","notification",
    function ($scope, AccountService, $location, notification) {
        $scope.login = function (userData) {
            AccountService.login(userData, function (data) {
                notification.showInfo("Login successful.");
                $location.path("/");
            }, function (error) {
                notification.showError("Login unsuccessful", error);
            });
        };
    }]);

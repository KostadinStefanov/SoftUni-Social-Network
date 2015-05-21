app.controller("LoginController", ["$scope", "accountService", "$location","notification",
    function ($scope, accountService, $location, notification) {
        $scope.login = function (userData) {
            accountService.login(userData, function (data) {
                notification.showInfo("Login successful.");
                $location.path("/");
            }, function (error) {
                notification.showError("Login unsuccessful", error);
            });
        };
    }]);

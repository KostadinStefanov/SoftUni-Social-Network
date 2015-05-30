app.controller("LoginController", ["$scope", "accountService", "$location","notification",
    function ($scope, accountService, $location, notification) {
        $scope.userData = {};
        $scope.login = function (userData) {
            accountService.login(userData, function () {
                notification.showInfo("Login successful.");
                $location.path("/");
            }, function (error) {
                notification.showError("Login unsuccessful", error);
            });
        };
    }]);

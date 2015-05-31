app.controller("LoginController", ["$scope", "accountService", "$location","notification",
    function ($scope, accountService, $location, notification) {
        $scope.user = {};
        $scope.login = function (user) {
            accountService.login(user, function () {
                notification.showInfo("Login successful.");
                $location.path("/");
            }, function (error) {
                notification.showError("Login unsuccessful", error);
            });
        };
    }]);

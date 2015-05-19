'use strict';

app.controller('HomeController',
    function HomeController($scope, AccountService) {

        $scope.AccountService = AccountService;

        $scope.logout = function(){
            AccountService.logout();
        }

    }
);
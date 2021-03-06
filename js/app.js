var app = angular.module("softUniSocialNetwork", ["ngRoute", "ngResource"]);
app
    .constant("baseUrl", "http://softuni-social-network.azurewebsites.net/api")
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/home.html",
                controller: "HomeController",
                pageName: "home",
                pageTitle: "Home"
            })
            .when("/login", {
                templateUrl: "templates/login.html",
                controller: "LoginController",
                pageName: "login",
                pageTitle: "Login"
            })
            .when("/register", {
                templateUrl: "templates/register.html",
                controller: "RegisterController",
                pageName: "register",
                pageTitle: "Registration"
            })

            .when("/edit", {
                templateUrl: "templates/edit.html",
                controller: "EditProfileController",
                pageName: "edit",
                pageTitle: "Edit"
            })

            .when("/invitations", {
                templateUrl: "templates/pendingRequests.html",
                controller: "HomeController",
                pageName: "invitations",
                pageTitle: "Invitations"
            })

            .when("/changePassword", {
                templateUrl: "templates/changePassword.html",
                controller: "HomeController",
                pageName: "changePassword",
                pageTitle: "Change Password"
            })

            .when('/user/:username/wall/', {
                templateUrl: 'templates/userWall.html',
                controller: 'userWallController',
                pageName: "user wall",
                pageTitle: "UserWall"
            })

            .when('/friends', {
                templateUrl: 'templates/friends.html',
                controller: 'HomeController',
                pageName: "friends",
                pageTitle: "Friends"
            })
            .otherwise({
                redirectTo: "/"
            });
    }])

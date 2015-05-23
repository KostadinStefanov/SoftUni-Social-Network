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

            .when('/user/:username/wall/', {
                templateUrl: 'templates/wall.html',
                controller: 'HomeController',
                pageName: "user wall",
                pageTitle: "UserWall"
            })

            .otherwise({
                redirectTo: "/"
            });
    }])

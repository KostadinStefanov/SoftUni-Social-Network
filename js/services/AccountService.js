app.factory("accountService", ["$http", "baseUrl", function ($http, baseUrl) {
    var KEY_USER_DATA = "currentUserInfo";
    return {
        register: function (data, success, error) {
            var request = {
                method: "POST",
                url: baseUrl + "/users/register",
                data: data
            };

            $http(request)
                .success(function (data) {
                    localStorage[KEY_USER_DATA] = angular.toJson(data);
                    success(data);
                })
                .error(error);
        },
        login: function (data, success, error) {
            var request = {
                method: "POST",
                url: baseUrl + "/users/login",
                data: data
            };

            $http(request)
                .success(function (data) {
                    localStorage[KEY_USER_DATA] = angular.toJson(data);
                    success(data);
                })
                .error(error);
        },
        logout: function () {
            localStorage.removeItem(KEY_USER_DATA);
        },
        getCurrentUser: function () {
            var userInfo = localStorage[KEY_USER_DATA];
            if (userInfo) {
                return angular.fromJson(userInfo);
            }
        },

        isAnonymous: function () {
            return this.getCurrentUser() == undefined;
        },
        isLoggedIn: function () {
            return !this.isAnonymous()
        },

        getAuthHeaders: function () {
            var headers = {};
            var user = this.getCurrentUser();
            if (user) {
                headers = "Bearer " + user.access_token;
            }

            return headers;
        },
        getAccessToken : function() {
            return localStorage.getItem('accessToken');
        }

    };
}]);
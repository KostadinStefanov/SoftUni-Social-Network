app.factory('userService', ["$http","$q", "$resource", "baseUrl", "accountService",
    function($http, $q, $resource, baseUrl, accountService){
        $http.defaults.headers.common['Authorization'] = accountService.getAuthHeaders();
        var PAGE_SIZE = 5;
        var resource = $resource(
                baseUrl + 'users/:option1/:option2',
                { option1: '@option1', option2: '@option2' },
                {
                    edit: {
                        method: 'PUT'
                    }
                }
            );

        return {
        getUserWall : function(username, startPostId){
            var option2 = 'wall?StartPostId' + (startPostId ? "=" + startPostId : "") + "&PageSize=" + PAGE_SIZE;
            return resource.query({ option1: username, option2: option2});
        },

        searchUser : function(searchTerm){
            var option1 = "search?searchTerm=" + searchTerm;
            return resource.query({ option1: option1 });
        },

        getUserFullData : function(username){
            return resource.get({ option1: username });
        }
    }
}]);
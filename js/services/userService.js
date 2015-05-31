app.factory('userService', ["$http","$q", "$resource", "baseUrl", "accountService",
    function($http, $q, $resource, baseUrl, accountService){
        $http.defaults.headers.common['Authorization'] = accountService.getAuthHeaders();
        var resource = $resource(
                baseUrl + '/users/:option1/:option2/:option3',
                { option1: '@option1', option2: '@option2', option3 : '@option3' },
                {
                    edit: {
                        method: 'PUT'
                    }
                }
            );

        return {
          logout : function(){
            return resource.save({option1: 'logout'});
        },

        searchUser : function(searchTerm){
            var option1 = "search?searchTerm=" + searchTerm;
            return resource.query({ option1: option1 });
        },

        getUserFullData : function(username){
            return resource.get({ option1: username });
        },

        getUserWall : function(username, pageSize, startPostId){
            var option2 = 'wall?StartPostId' + (startPostId ? "=" + startPostId : "") + "&PageSize=" + pageSize;
            return resource.query({ option1: username, option2: option2});
        },

        //getUserPreviewData : function(username){
        //    return resource.get({ option1: username, option2: 'preview' });
        //},


        getUserFriendsPreview : function(username){
            return resource.get({ option1: username, option2: 'friends', option3: 'preview' });
        },

        getUserFriends : function(username){
            return resource.query({ option1: username, option2: 'friends' });
        }
    }
}]);
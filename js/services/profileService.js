app.factory('profileService', ["$http", "$q", "$resource", "baseUrl", "accountService",
    function ($http, $q, $resource, baseUrl, accountService){
        $http.defaults.headers.common['Authorization'] = accountService.getAuthHeaders();

        var resource = $resource(
                baseUrl + '/me/:option1/:option2',
                { option1: '@option1', option2: '@option2' },
                {
                    edit: {
                        method: 'PUT'
                    }
                }
            );

        return {
        me : function(){
            return resource.get();
        },

        getNewsFeed : function(pageSize, startPostId){
            var option1 = 'feed?StartPostId' + (startPostId ? "=" + startPostId : "") + "&PageSize=" + pageSize;

            return resource.query({ option1: option1});
        },

        ProfileUpdate :function(data, option1){
            return resource.edit({option1: option1}, data);
        },

        getFriendsList : function(){
            return resource.query({ option1: 'friends'});
        },

        getFriendsListPreview : function(){
            return resource.get({ option1: 'friends', option2: 'preview'});
        },

        sendFriendRequest : function(username){
            return resource.save({ option1: 'requests', option2: username});
        },

        getPendingRequests : function(){
            return resource.query({ option1: 'requests' });
        },

        acceptRequest : function(requestId){
            var option2 = '' + requestId + '?status=approved';

            return resource.edit({ option1: 'requests', option2: option2});
        },

        rejectRequest : function(requestId){
            var option2 = '' + requestId + '?status=rejected';

            return resource.edit({ option1: 'requests', option2: option2});
        }

    };
}]);
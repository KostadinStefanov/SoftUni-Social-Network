app.factory('postService', ["$http", "$q", "$resource", "baseUrl", "accountService",
    function($http, $q, $resource, baseUrl, accountService){
        $http.defaults.headers.common['Authorization'] =  accountService.getAuthHeaders();
        var resource = $resource(
            baseUrl + '/posts/:option1/:option2/:option3',
                {
                    option1: '@option1',
                    option2: '@option2',
                    option3: '@option3'
                },
                {
                    edit: {
                        method: 'PUT'
                    }
                }
            );
        return{
            addPost : function(postData){
                return resource.save(postData);
            },

            like : function(postId){
                return resource.save({option1: postId, option2: "likes"})
            },

            unlike : function(postId){
                return resource.remove({option1: postId, option2: "likes"})
            },

            removePost : function(postId){
                return resource.remove({option1: postId});
            },

            editPost : function(postId, postContent){
                var postData = { 'postContent': postContent};
                return resource.edit({option1: postId}, postData);
            }
         }
    }
]);

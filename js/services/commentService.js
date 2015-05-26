app.factory('commentService', ["$http", "$q", "$resource", "baseUrl", "accountService",
    function($http, $q, $resource, baseUrl, accountService){
        $http.defaults.headers.common['Authorization'] =  accountService.getAuthHeaders();
            var resource = $resource(
                baseUrl + 'posts/:option1/comments/:option2/:option3',
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
        return {
            addComment: function (postId, commentData) {
                return resource.save({option1: postId}, commentData);
            },

            getPostComments: function (postId) {
                return resource.query({option1: postId});
            },

            like: function (postId, commentId) {
                return resource.save({option1: postId, option2: commentId, option3: "likes"})
            },

            unlike: function (postId, commentId) {
                return resource.remove({option1: postId, option2: commentId, option3: "likes"})
            },

            removeComment: function (postId, commentId) {
                return resource.remove({option1: postId, option2: commentId});
            },

            editComment: function (postId, commentId, commentContent) {
                var commentData = {'commentContent': commentContent};
                return resource.edit({option1: postId, option2: commentId}, commentData);
            }
        }
    }
]);

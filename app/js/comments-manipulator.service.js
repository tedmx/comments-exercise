angular.module('commentsShowcaseApp')
.factory('commentsManipulator', function() {

  return {
  	addComment: function(commentList,topic,body){
     var newComment = {
        topic: topic, 
        body: body, 
        replies: []
      };
      commentList.push(newComment);
    }
  };
});
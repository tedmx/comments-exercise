angular.module('commentsShowcaseApp').component('commentAndReplies', {
  templateUrl: 'templates/comment-and-replies.component.html',
  controller: function (){
    this.onPublish = function(topic,body){
      var commentData = {
        topic: topic, 
        body: body, 
        replies: []
      };
      this.comment.replies.push(commentData);
    }
  },
  bindings: {
  	comment: "=",
    onDeleteButtonClick: "&"
  }
});

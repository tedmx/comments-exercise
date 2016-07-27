angular.module('commentsShowcaseApp').component('commentAndReplies', {
  templateUrl: 'templates/comment-and-replies.component.html',
  controller: ['commentsManipulator', function (commentsManipulator){

    var ctrl = this;
    this.onAddReply = 
      (topic, body) => {
      commentsManipulator.addComment(
        this.comment.replies,
        topic, 
        body
      );
    };

  }],
  bindings: {
  	comment: "=",
    onDeleteButtonClick: "&"
  }
});

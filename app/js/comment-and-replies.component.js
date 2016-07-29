angular.module('commentsShowcaseApp').component('commentAndReplies', {
  templateUrl: 'templates/comment-and-replies.component.html',
  controller: ['commentsStorage', '$scope', function (commentsStorage, $scope){

    var ctrl = this;
    this.onAddReply = 

      (topic, body) => {

      if(!this.comment.replies){
        this.comment.replies = [];
      }

      commentsStorage.addComment(
        topic, 
        body,
        this.comment.id
      ).then((response)=>{
        $scope.$apply(()=>{
          this.comment.replies.push(response);
        });
      });

    };

  }],
  bindings: {
  	comment: "=",
    onDeleteButtonClick: "&"
  }
});

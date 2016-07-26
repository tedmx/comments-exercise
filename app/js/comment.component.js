angular.module('commentsShowcaseApp').component('comment', {
  templateUrl: 'templates/comment.component.html',
  controller: function (){
  	this.showReplyBox = false;
  	this.onHideCommentBox = function(){
  		this.showReplyBox = false;
  	};
    this.addSubcomment = function(comment){
      var commentData = Object.assign(comment, {replies: []});
      this.replies.push(commentData);
    }
  },
  bindings: {
  	topic: "<",
  	body: "<",
  	replies: "=",
    onDeleteButtonClick: "&"
  }
});

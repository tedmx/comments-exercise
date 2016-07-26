angular.module('commentsShowcaseApp')
.component('commentSystem', {
  templateUrl: 'templates/comment-system.component.html',
  controller: ['commentsStorage', function (commentsStorage){
  	console.log(commentsStorage);
  	this.commentData = commentsStorage.getCommentData();
  }]
});
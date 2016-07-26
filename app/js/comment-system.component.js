angular.module('commentsShowcaseApp')
.component('commentSystem', {
  templateUrl: 'templates/comment-system.component.html',
  controller: ['commentsStorage', '$scope', function (commentsStorage, $scope){
  	console.log(commentsStorage);
  	this.commentData = commentsStorage.getCommentData();

  	$scope.$watch('this.commentData', function() {
        alert('STOP CHANGING THAT SHIT');
    },true);

    this.publishTopLevelComment = function(topic,body){
      var newComment = {
        topic: topic, 
        body: body, 
        replies: []
      };
      this.commentData.push(newComment);
    }
  }]
});
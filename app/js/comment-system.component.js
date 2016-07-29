angular.module('commentsShowcaseApp')
.component('commentSystem', {
  templateUrl: 'templates/comment-system.component.html',
  controller: [
    'commentsStorage', 
    '$scope',
    'commentDataUtils',

    function CommentSystemController(

      commentsStorage, 
      $scope,
      commentDataUtils

    ){

      var ctrl = this;

      commentsStorage.getFullCommentData()
      .then((flatCommentData) => {
        $scope.$apply(()=>{
          ctrl.commentData = commentDataUtils.commentDataTreeFromArray(flatCommentData);
        });
      });

      ctrl.publishTopLevelComment = 
        (topic, body) => {
        commentsStorage.addComment(
          topic, 
          body,
          {topLevel: true}
        ).then((response)=>{
          $scope.$apply(()=>{
            ctrl.commentData.push(response);
          });
        });
      };

      ctrl.getDefaultData = 
        () => {
        commentsStorage.resetToDefaultData()
        .then((flatDefaultData) => {
          $scope.$apply(()=>{
            ctrl.commentData = commentDataUtils.commentDataTreeFromArray(flatDefaultData);
          });
        });
      };
      
  }]
});
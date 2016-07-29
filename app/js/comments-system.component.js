angular.module('commentsShowcaseApp')
.component('commentsSystem', {
  templateUrl: 'templates/comments-system.component.html',
  controller: [
    'commentsStorage', 
    '$scope',
    'commentDataUtils',

    function CommentsSystemController(

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
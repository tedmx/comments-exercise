angular.module('commentsShowcaseApp')
.component('commentSystem', {
  templateUrl: 'templates/comment-system.component.html',
  controller: [
    'commentsStorage', 
    '$scope', 
    'commentsManipulator', 
    function (commentsStorage, 
      $scope, 
      commentsManipulator){

      var ctrl = this;

      ctrl.getDefaultData = function(){
        ctrl.commentData = commentsStorage.getCommentData();
      }

      var localStorageStringData = localStorage.getItem('comments_showcase_app');

      if(localStorageStringData != "undefined"){
        ctrl.commentData = JSON.parse(localStorageStringData);
      } else {
        ctrl.getDefaultData();
      }

      $scope.$watch(function(){
        return $scope.$ctrl.commentData;
      }, function(newValue, oldValue){
        window.localStorage.setItem(
          'comments_showcase_app',
          angular.toJson(newValue)
        );
      }, true);

      ctrl.publishTopLevelComment = 
        (topic, body) => {
        commentsManipulator.addComment(
          ctrl.commentData,
          topic, 
          body
        );
      };
      
  }]
});
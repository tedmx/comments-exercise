angular.module('commentsShowcaseApp')
.component('commentsList', {
  templateUrl: 'templates/comments-list.component.html',
  controller: ['commentsStorage', '$scope', function (commentsStorage, $scope){
  	var ctrl = this;
  	ctrl.removeComment = function(DOMIndex){
      var target = ctrl.list[DOMIndex];
      commentsStorage.removeComment(
        target.id
      ).then((response)=>{
        $scope.$apply(()=>{
          ctrl.list.splice(DOMIndex,1);
        });
      });
  	}
  }],
  bindings: {
  	list: "="
  }
});
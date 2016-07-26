angular.module('commentsShowcaseApp')
.component('commentList', {
  templateUrl: 'templates/comment-list.component.html',
  controller: function(){
  	var ctrl = this;
  	ctrl.removeComment = function(index){
  		ctrl.list.splice(index,1);
  	}
  },
  bindings: {
  	list: "="
  }
});
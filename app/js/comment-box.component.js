angular.module('commentsShowcaseApp').component('commentBox', {
  templateUrl: 'templates/comment-box.component.html',
  controller: function(){
  	var ctrl = this;
  	ctrl.publishComment = function(){
  		ctrl.onPublish ({
  			comment: {	
  				topic: ctrl.topic,
  			  	body: ctrl.body
  			}
  		});
  		ctrl.show = false;
  	}
  },
  bindings: {
  	show: "=",
  	topLevel: "<",
  	onPublish: "&"
  }
});

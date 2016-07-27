angular.module('commentsShowcaseApp').component('commentBox', {
  templateUrl: 'templates/comment-box.component.html',
  controller: function(){
  	var ctrl = this;
  	ctrl.publishComment = function(){
  		ctrl.onPublish ({	
  				topic: ctrl.topic,
  			  body: ctrl.body
  		});
      ctrl.topic = "";
      ctrl.body = "";
  	}
  },
  bindings: {
  	topLevel: "<",
  	onPublish: "&",
    onHideButtonClick: "&"
  }
});

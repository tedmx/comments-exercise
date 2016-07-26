angular.module('commentsShowcaseApp').component('replyInputs', {
  templateUrl: 'templates/reply-inputs.component.html',
  controller: function (){
  	this.showReplyBox = false;
    this.onPublish = function(topic,body){
      this.superOnPublish({topic: topic, body: body});
      this.showReplyBox = false;
    }
  },
  bindings: {
  	topic: "<",
  	body: "<",
  	replies: "=",
    superOnPublish: "&onPublish"
  }
});

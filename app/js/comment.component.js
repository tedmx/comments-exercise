angular.module('commentsShowcaseApp').component('comment', {
  templateUrl: 'templates/comment.component.html',
  controller: function (){
    this.save = function(){
      this.data.topic = this.topicEdits;
      this.data.body = this.bodyEdits;
      this.editMode = false;
    }
    this.enableEditMode = function(){
      this.topicEdits = this.data.topic;
      this.bodyEdits = this.data.body;
      this.editMode = true;
    }
  },
  bindings: {
  	data: "=",
    onDeleteButtonClick: "&",
    onSaveButtonClick: "&"
  }
});

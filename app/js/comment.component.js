angular.module('commentsShowcaseApp').component('comment', {
  templateUrl: 'templates/comment.component.html',
  controller: ['commentsStorage', '$scope', function (commentsStorage, $scope){
    this.save = function(){

      commentsStorage.modifyComment(
        this.data.id,
        this.topicEdits,
        this.bodyEdits
      ).then((modifiedCommentAsResponse)=>{
        $scope.$apply(()=>{
          this.data = modifiedCommentAsResponse;
          this.editMode = false;
        });
      });

    }

    this.enableEditMode = function(){
      this.topicEdits = this.data.topic;
      this.bodyEdits = this.data.body;
      this.editMode = true;
    }
  }],
  bindings: {
  	data: "=",
    onDeleteButtonClick: "&"
  }
});

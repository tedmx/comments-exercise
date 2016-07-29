'use strict';  

angular.module('commentsShowcaseApp', [])
.factory('jsUtils', function() {

  return {
    isNumeric: function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    clone: function(obj){
      return JSON.parse(JSON.stringify(obj));
    }
  };

}).factory('commentDataUtils', function() {

  return {

    defaultData: [
      { 
        id: 0,
        topLevel: true,
        topic: "A",
        body: "A is awesome.",
        replies: [2]
      },
      { 
        id: 1,
        topLevel: true,
        topic: "B",
        body: "B is fantastic."
      },
      {
        id: 2,
        topic: "No",
        body: "C is BESTEST OF BEST",
        parent: 0,
        replies: [3]
      },
      {
        id: 3,
        topic: "Opinion",
        parent: 2,
        body: "Probably E can be better sometimes"
      }
    ],

    commentDataTreeFromArray: function(arr){

        var index = {},
            deliverable = [];

        for (let flatCommentElement of arr){
          index[flatCommentElement.id] = flatCommentElement;
          if(flatCommentElement.topLevel){
            deliverable.push(flatCommentElement);
          }
        }

        function linkRepliesToEachOf(parentCommentsArr){
          var comment;
          for(var i=0; i<parentCommentsArr.length; i++){
            comment = parentCommentsArr[i];
            linkRepliesTo(comment);
          }
        }

        function linkRepliesTo(comment){

          if(!comment.replies 
             || !comment.replies.length){
            return;
          } 
          var repliesAsIDs = comment.replies;
          comment.replies = repliesAsIDs.map(function(replyID){
            var replyObject = index[replyID];
            linkRepliesTo(replyObject);
            return replyObject;
          });
        }

        linkRepliesToEachOf(deliverable);

        return deliverable;

      }

  }

});
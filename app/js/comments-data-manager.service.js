angular.module('commentsShowcaseApp')
.factory('commentsDataManager', ['jsUtils', function(jsUtils) {

  var workCopyData = [],
      index = {}; 

  // Util method

  function lowestUnoccupiedID(){
    var i; 
    for(i=0; index[i]; i++){};
    return i;
  }

  //

  function initWith(data, options){

    workCopyData = data;

    for (commentData of workCopyData){
      index[commentData.id] = commentData;
    }

  }

  function getIndex(){
    return jsUtils.clone(index);
  }

  function getFullCommentData(){
    return jsUtils.clone(workCopyData);
  }

  // Lower level, few dependencies, unit-test friendly

  function addComment(topic, body, options){

    var optionsObject = {};
    var IDOfNewComment = lowestUnoccupiedID();

    var newComment = {
      id: IDOfNewComment,
      topic: topic,
      body: body,
    };

    if(jsUtils.isNumeric(options)){

      var parentID = options;

      if(index[parentID].replies){
        index[parentID].replies.push(IDOfNewComment);
      } else {
        index[parentID].replies = [IDOfNewComment];
      }

      newComment.parent = parentID;

    } else if(options instanceof Object && options.topLevel){
      newComment.topLevel = true;
    }

    workCopyData.push(newComment);
    index[IDOfNewComment] = newComment;

    return jsUtils.clone(newComment);

  }

  function removeComment(id){

    var commentTBRemoved = index[id],
        children = index[id].replies;
    if(children){
      for(child of children){
        removeComment(child);
      }
    }

    if(!commentTBRemoved.topLevel){
      var parentObject = index[commentTBRemoved.parent];
      var indexInParentsReplyArray = parentObject.replies.indexOf(id);
      parentObject.replies.splice(indexInParentsReplyArray, 1);
    }

    var indexInWorkCopyArray = workCopyData.indexOf(commentTBRemoved);
    workCopyData.splice(indexInWorkCopyArray, 1);

    delete index[id];

    return true;
  }

  function modifyComment(id, topic, body){
    index[id].topic = topic;
    index[id].body = body;

    return jsUtils.clone(index[id]);
  }

  return {
  	initWith: initWith,
    getFullCommentData: getFullCommentData,
    addComment: addComment,
    removeComment: removeComment,
    modifyComment: modifyComment,
    getIndex: getIndex
  };

}]);
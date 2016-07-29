angular.module('commentsShowcaseApp')
.factory('commentsStorage', ['commentDataUtils', 'jsUtils', function(commentDataUtils, jsUtils) {

  var workCopyData = [],
      index = {}; 

  function resetToDefaultData(){
    return getFullCommentData(true);
  }

  function getFullCommentData(forceDefaultData){

    var localStorageStringData = window.localStorage.getItem('comments_showcase_app'),
        deliverable;

    if(localStorageStringData != null && localStorageStringData != "undefined" && !forceDefaultData){
      workCopyData = JSON.parse(localStorageStringData);
    } else {
      workCopyData = commentDataUtils.defaultData;
      updateLocalStorage();
    }

    for (commentData of workCopyData){
      index[commentData.id] = commentData;
    }

    return new Promise(function(resolve){
      window.setTimeout(()=>{
        resolve(jsUtils.clone(workCopyData));
      },globalPromiseDelay());
    });

  }

  function updateLocalStorage(){
    window.localStorage.setItem(
      'comments_showcase_app',
      JSON.stringify(workCopyData)
    );
  }

  function lowestUnoccupiedID(){
    var i;
    for(i=0; index[i]; i++){};
    return i;
  }

  function globalPromiseDelay(){
    return 500+300*Math.random();
  }

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
    updateLocalStorage();

    return new Promise(function(resolve){
      window.setTimeout(()=>{
        resolve(jsUtils.clone(newComment));
      },globalPromiseDelay());
    });

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
  }

  function removeCommentAndSendPromise(id){

    removeComment(id);
    updateLocalStorage();

    return new Promise(function(resolve){
      window.setTimeout(()=>{
        resolve(true);
      },globalPromiseDelay());
    });
  }

  function modifyComment(id, topic, body){
    index[id].topic = topic;
    index[id].body = body;
    updateLocalStorage();

    return new Promise(function(resolve){
      window.setTimeout(()=>{
        resolve(jsUtils.clone(index[id]));
      },globalPromiseDelay());
    });
  }

  return {
  	getFullCommentData: getFullCommentData,
    addComment: addComment,
    removeComment: removeCommentAndSendPromise,
    resetToDefaultData: resetToDefaultData,
    modifyComment: modifyComment
  };

}]);
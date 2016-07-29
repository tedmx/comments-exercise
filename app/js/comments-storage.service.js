angular.module('commentsShowcaseApp')
.factory(

  'commentsStorage', 

  [ 'commentsDataManager', 
    'commentDataUtils', 
    'jsUtils', 

    function(
      commentsDataManager, 
      commentDataUtils, 
      jsUtils) {

      var workCopyData = [],
          index = {}; 

      function resetToDefaultData(){
        return getFullCommentData(true);
      }

      function getFullCommentData(forceDefaultData){

        var localStorageStringData = window.localStorage.getItem('comments_showcase_app'),
            deliverable;


        var startupData;

        if (
          forceDefaultData
          || localStorageStringData == 'undefined'
          || localStorageStringData == null
        ) {

          startupData = commentDataUtils.defaultData;
          updateLocalStorage(commentDataUtils.defaultData);

        } else {
          startupData = JSON.parse(localStorageStringData);
        }

        commentsDataManager.initWith(startupData);

        return timeoutPromise(startupData);

      }

      function updateLocalStorage(data){
        window.localStorage.setItem(
          'comments_showcase_app',
          JSON.stringify(data)
        );
      }

      // Input data won't be mutilated by recieving party
      function timeoutPromise(data){

        var dataToSend = data instanceof Object ? jsUtils.clone(data) : data;

        return new Promise(function(resolve){
          window.setTimeout(()=>{
            resolve(dataToSend);
          }, 500+300*Math.random());
        });
      }

      // Wrappers around low-level commentsDataManager service methods
      function addComment(topic, body, options){

        var responseAsComment = commentsDataManager.addComment(topic, body, options);
        updateLocalStorage(commentsDataManager.getFullCommentData());

        return timeoutPromise(responseAsComment);

      }

      function removeComment(id){

        commentsDataManager.removeComment(id);
        updateLocalStorage(commentsDataManager.getFullCommentData());

        return timeoutPromise(true);

      }

      function modifyComment(id, topic, body){

        var modifiedComment = commentsDataManager.modifyComment(id, topic, body);
        updateLocalStorage(commentsDataManager.getFullCommentData());

        return timeoutPromise(modifiedComment);
      }

      return {

      	getFullCommentData: getFullCommentData,
        addComment: addComment,
        modifyComment: modifyComment,
        removeComment: removeComment,
        resetToDefaultData: resetToDefaultData

      };

}]);
angular.module('commentsShowcaseApp')
.factory('commentsStorage', function() {
  function getCommentData(){
  	return [
    	{
    		topic: "A",
    		body: "A is awesome.",
    		replies: [{
	    		topic: "No",
	    		body: "C is BESTEST OF BEST",
	    		replies: [{
		    		topic: "Opinion",
		    		body: "Probably E can be better sometimes",
            replies: []
	    		}]
    		}]
    	},
    	{
    		topic: "B",
    		body: "B is fantastic.",
        replies: []
    	}
    ]
  };
  return {
  	getCommentData: getCommentData
  };
});
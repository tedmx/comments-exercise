'use strict';

describe('commentsDataManager', function() {

  var commentsDataManager;

  beforeEach(module('commentsShowcaseApp'));

  function getSampleData(){
    return [
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
    ]
  }

  beforeEach(function() {

    inject(function($injector) {
      commentsDataManager = $injector.get('commentsDataManager');
    });

  });

  it('should initialize correctly given sample data', function() {
    commentsDataManager.initWith(getSampleData());
    expect(commentsDataManager.getIndex()[3].topic).toEqual("Opinion");
  });

  it('should correctly add first comment to the system', function() {

    commentsDataManager.addComment('0','0',{topLevel: true}); 

    var newlyAddedComment = commentsDataManager.getFullCommentData()[0];

    expect(newlyAddedComment.topic).toEqual("0");
    expect(newlyAddedComment.topLevel).toEqual(true);
  });

  it('should correctly add top-level comment to sample data', function() {

    commentsDataManager.initWith(getSampleData());

    commentsDataManager.addComment('0','0', 2); 

    var newlyAddedComment = commentsDataManager.getFullCommentData()[4];

    expect(newlyAddedComment.topic).toEqual("0");
    expect(newlyAddedComment.parent).toEqual(2);
  });

  it('should correctly remove single reply comment from sample data', function() {

    commentsDataManager.initWith(getSampleData());

    commentsDataManager.removeComment(3); 
    expect(commentsDataManager.getFullCommentData().length).toEqual(3);

  });

  it('should correctly remove whole branch when deleting comment with replies', function() {

    commentsDataManager.initWith(getSampleData());

    commentsDataManager.removeComment(2); 
    expect(commentsDataManager.getFullCommentData().length).toEqual(2);
    
  });

  it('should correctly update reply comment', function() {

    commentsDataManager.initWith(getSampleData());

    commentsDataManager.modifyComment(2, "0", "0");
    expect(commentsDataManager.getFullCommentData()[2].topic).toEqual("0");
    
  });

  it('should handle wiping off whole sample data', function() {
    
    commentsDataManager.initWith(getSampleData());

    commentsDataManager.removeComment(0);
    commentsDataManager.removeComment(1);

    expect(commentsDataManager.getFullCommentData().length).toEqual(0);

  });

});
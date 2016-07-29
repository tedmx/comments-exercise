'use strict';

describe('commentDataUtils', function() {

  var commentDataUtils;

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
      commentDataUtils = $injector.get('commentDataUtils');
    });

  }); 

  it('should construct correct tree structure from flat input', function() {
    var treeStructure = commentDataUtils.commentDataTreeFromArray(getSampleData());
    expect(treeStructure[0].replies[0].replies[0].topic).toEqual('Opinion');
    expect(treeStructure.length).toEqual(2);
  });

});
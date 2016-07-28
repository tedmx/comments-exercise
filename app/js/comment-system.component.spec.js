'use strict';

describe('commentSystem', function() {

  beforeEach(module('commentsShowcaseApp'));

  describe('CommentSystemController', function() {

    it('should initialize with `commentData` defined as an Array', inject(function($componentController) {
      var ctrl = $componentController('commentSystem');
      expect(ctrl.commentData).toEqual(jasmine.any(Array));
    }));

    it('should add top-level comment via publishTopLevelComment', inject(function($componentController) {

      var ctrl = $componentController('commentSystem');
      var mockTopic = 'Re: BRexit';
      var mockBody = 'I think that\'s a rather subjective thing.'

      ctrl.publishTopLevelComment(mockTopic,mockBody);

      var newlyAddedComment = ctrl.commentData[ctrl.commentData.length-1];
      expect(newlyAddedComment.topic).toEqual(mockTopic);
      expect(newlyAddedComment.body).toEqual(mockBody);
      expect(newlyAddedComment.replies).toEqual(jasmine.any(Array));

    }));

    it('should correctly load data from localStorage', inject(function($componentController) {

      window.localStorage.setItem(
        'comments_showcase_app',
        JSON.stringify([
          {
            topic: "B",
            body: "B is fantastic.",
            replies: []
          }
        ])
      );

      var ctrl = $componentController('commentSystem');

      expect(ctrl.commentData[0].topic).toEqual('B');

    }));

  });

});
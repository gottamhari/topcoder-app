const mockData = require('../../../tests/test-helpers/mock-data')

/* jshint -W117, -W030 */
describe('Profile Badges Controller', function() {
  var controller;
  var profileService, userService;
  var scope;
  var mockUserProfile = mockData.getMockUserProfile();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.profile');
    bard.inject(this,
      '$httpBackend',
      '$rootScope',
      '$controller',
      'CONSTANTS',
      '$q',
      'ProfileService',
      'UserService'
    );

    profileService = ProfileService;
    userService = UserService;

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      };
    });
    scope = $rootScope.$new();
    controller = $controller('BadgesController', {
      $scope: scope,
      userHandle: 'vikasrohit',
      profile: {photoURL: "http://topcoder.com/test.png", badges: mockUserProfile.data}
    });
    $rootScope.$apply();

  });

  bard.verifyNoOutstandingHttpRequests();

  describe('initialization', function() {

    it('$scope.achievements', function() {
      expect(scope.achievements).to.exist;
    });

    it('controller.achievementGroups', function() {
      expect(controller.achievementGroups).to.exist;
      expect(controller.achievementGroups).to.have.length.above(0);
    });
  });


});

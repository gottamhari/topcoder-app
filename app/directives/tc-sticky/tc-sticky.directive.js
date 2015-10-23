
(function() {
  'use strict';

  angular.module('tcUIComponents').directive('tcSticky', ['CONSTANTS', '$window', tcSticky]);

  function tcSticky(CONSTANTS, $window) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.width = element.prop('offsetWidth');
            var elWidth = scope.width + 'px',
                elChild = angular.element(element[0].querySelector(':first-child'));
                // elChild.css('width', elWidth);
            angular.element($window).bind("scroll", function() {
                var affixElement = document.getElementById('affix'),
                    xPosition = 0,
                    yPosition = 0;
                function getPosition(element) {
                    while(element) {
                        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                        element = element.offsetParent;
                    }
                }
                getPosition(affixElement);
                var height = angular.element(affixElement).prop('offsetHeight');
                var top = angular.element(affixElement).prop('offsetTop');
                // console.log(yPosition);
                // console.log(angular.element(document).scrollTop);
                // console.log(elChild[0].clientTop);
                if (yPosition >= 0 || $window.innerHeight <= elChild[0].offsetHeight || $window.innerWidth < 768) {
                    elChild.removeClass('affix affix-bottom');
                } else if ( yPosition < 0) {
                    console.log(top + height);
                    console.log(yPosition);
                    console.log(top + height + yPosition);
                    if (top + height + yPosition < 800) {
                        elChild.addClass('affix-bottom');
                        elChild.removeClass('affix');
                    } else {
                        elChild.removeClass('affix-bottom');
                        elChild.addClass('affix');
                    }
                    
                };
            });
        }
    };
  }
})();
'use strict';

angular.module('carousel', ['ui.bootstrap.transition'])
  .directive('carousel', function($transition, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          forward: '=',
          currentSlide: '=' 
        },
        controller: function ($scope, $element) {

                      console.log(1);

          $scope.slides = [];             

          /*
           * 添加图片
           */
          this.addSlide = function (slide) {

            if ($scope.currentSlide === $scope.slides.length) {
            
              slide.active = true;
            
            }

            $scope.slides.push(slide); 

          };

          /*
           * 删除图片
           */
          this.removeSlide = function (slide) {

            var idx = $scope.slides.indexOf(slide); 

            $scope.slides.splice(idx, 1); 

          };

          //var oldSlide = $scope.currentSlide;

          var transition;

          /*
           * watch 绑定 currentSlide.
           */
          $scope.$watch('currentSlide', function (newSlide, oldSlide) {

            if (newSlide === oldSlide) {

              return;

            }
          
            var forward = $scope.forward;

            if (!transition) {

              go(oldSlide, newSlide, forward);
            
            }
          
          });

          /*
           *  移动图片
           */
          function go(from, to, forward) {

            if (from === to) return;

            var lor = forward ? 'left' : 'right';

            var pon = forward ? 'next' : 'prev';

            var fromSlide = $scope.slides[from];

            var toSlide = $scope.slides[to];

            toSlide[pon] = true;
          
            $timeout(function() {
            
              fromSlide[lor] = toSlide[lor] = true;
            
            });

            transition = $transition(toSlide.$element, {}).then(

              function () {

                angular.extend(fromSlide, { active: true, left: false, right: false, prev:false, next:false});

                angular.extend(toSlide, { active: true, left: false, right: false, prev: false, next: false});
              
              }
                
            );
          
          }
            
        },

        templateUrl: 'widget/carousel.html'
    
      };
  
  });

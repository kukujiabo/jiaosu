'use strict';

/*
 * 定义carousel controller.
 */
angular.module('app', ['carousel'])
  .controller('CarouselController', function ($scope, $element) {

    /*
     * 图片数组
     */
    $scope.images = [
    
      './imgs/'
    
    ];
  
    /*
     * 当前显示的滑动
     */
    $scope.currentSlide = 1;

    /*
     *  选择前一张图
     */
    $scope.prev = function () {

      $scope.foward = false;

      $scope.currentSlide = ($scope.currentSlide + $scope.images.length - 1) % $scope.images.length; 
    
    };
  
    /*
     *  选择后一张图
     */
    $scope.next = function () {

      $scope.forward = true;

      $scope.currentSlide = ($scope.currentSlide + 1) % $scope.images.length;
    
    };
  
  });

var App = angular.module("App", ["ionic"]);

App.service("FreshlyPressed", ["$http", FreshlyPressed]);

App.controller("AppCtrl", ["$scope", "FreshlyPressed", AppCtrl]);

App.value('Logo', "img/logo.png")

function AppCtrl($scope, FreshlyPressed) {
		$scope.posts = [];
		$scope.refresh = function() {
			FreshlyPressed.getBlogs($scope);
		}
}

function FreshlyPressed($http) {
	this.getBlogs = function($scope) {
		$http.jsonp('https://public-api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK')
			.success(function(result) {
					$scope.posts = result.posts;
					$scope.$broadcast("scroll.refreshComplete");
			})
	}
}


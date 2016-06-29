
	
	var app = angular.module('helpy', ['ui.router', 'ngSanitize']);

	angular.module('HTML5ModeURLs', []).config(['$routeProvider', function($route) {
	  $route.html5Mode(true);
	}]);

	app.config(function($httpProvider){
    	delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

	app.controller('app', function($scope, $controller, $location, $interval, $timeout, $http, $rootScope, $state, $stateParams, $sce) {


		$scope.error = $scope.isPost = false;
		$scope.posts;
		$scope.post;
		$scope.postContent = 'Nothing to see here.';

		$scope.getState = function() {
			return window.location.hash.replace('#/', '');
		};

		$scope.state = $scope.getState();

		$scope.request = function(endpoint, data, method, callback) {
	        var config = {
	            
	        }

	        method = method.length ? method : 'put';
	        send = method == 'put' ? 'POST' : 'GET';
	        var url = endpoint;
	        
	        

	        if(send == 'POST') {

	        	var args = $.param({
		            params: JSON.stringify(data)
		        });

	        	$http.post(url, args).then(function(response) {
		        	if(!response && $scope.errorHandler !== undefined) {
		        		$scope.errorHandler(response.data);
		        	}
		            callback(response.data);
		        });
	        	
	        } else {

	        	var args = {
		            method: send,
		            params: data,
		            headers: config.headers,
		            url: url,
		        };

	        	$http(args).then(function(response) {
		        	if(!response && $scope.errorHandler !== undefined) {
		        		$scope.errorHandler(response);
		        	}
		            callback(response.data);
		        });

	        }
    	};

    	$scope.errorHandler = function(response) {
    		console.log(response);
    	};

    	$scope.getPost = function(post) {
			$scope.request('pages/site.json', {}, 'get', function(response) {
				if(post == '*') {
					$scope.isPost = $scope.error = false;

					$scope.posts = response.posts;
				} else {
					$scope.state = $scope.getState();
					if(response.posts[$scope.state]) {
						$scope.isPost = true;
						$scope.error = false;
						$scope.request('pages/posts/' + $scope.state + '.html', {}, 'get', 
							function(content) {
								$scope.postContent = $sce.trustAsHtml(content);
							}
						);
						$scope.post = response.posts[$scope.state];
					} else {
						$scope.isPost = false;
						$scope.error = true;
					}
				}
			});
    	}

 	});

angular.module('Rinoplastie.controllers', ['ngCookies'])

.controller('loginController', ['$scope', '$rootScope', '$cookies', 'authService', function ($scope, $rootScope, $cookies, loginSrv) {
	$scope.loginInfo;
	$scope.user = {
		'name' : $cookies.get('userName'),
		'email' : $cookies.get('userEmail'),
		'authToken' : $cookies.get('userAuthToken'),
		'createdAt' : $cookies.get('userCreatedAt'),
	};

	$scope.login = function () {
		loginSrv.login($scope.loginInfo)
		.then(function(response) {
			$scope.user = response.data;
			$cookies.put('userName', $scope.user.name);
			$cookies.put('userEmail', $scope.user.email);
			$cookies.put('userAuthToken', $scope.user.authToken);
			$cookies.put('userCreatedAt', $scope.user.createdAt);
			$cookies.put('userError', $scope.user.error);
		})
		.catch(function(response) {
			$scope.user = response.data;
		});
    };
	
	$scope.logout = function () {
		loginSrv.logout($scope.user.authToken)
		.then(function(response){
			$scope.user = null;
			$cookies.remove('userName');
			$cookies.remove('userEmail');
			$cookies.remove('userAuthToken');
			$cookies.remove('userCreatedAt');
			$cookies.remove('userError');
		})
		.catch(function(response){
			
		});
		
    };
	
	$scope.isUserLoggedIn = function () {
		alert($scope.user != null && $scope.user.error != true);
    };
	
	$scope.userInfo = function () {
		alert(JSON.stringify($scope.user.authToken));
    };
}])
 
.factory('authService', ['$http', function($http) {
	
	var serviceBase = '/rinoplastie/v1';
   
	this.login = function(loginInfo) {
		var request = $http.post(serviceBase + '/login', loginInfo)
		.success(function(data, status, headers, config) {
		})
		.error(function(data, status, headers, config) {
		});
		return request;
    };
	
	this.logout = function(authToken) {
		var request = $http.get(serviceBase + '/logout', {
			headers: {'Authorization': authToken}
		});
		request.success(function(data, status, headers, config) {
		});
		request.error(function(data, status, headers, config) {
		});
		return request;
	}
		
   return this;
 }])
 
.controller('photosController', ['$scope', '$cookies', 'photoService', function($scope, $cookies, photoService){
	$scope.allPhotos;
	
	$scope.uploadFile = function(){
		var photo = {
			'before': $scope.before,
			'after': $scope.after,
			'type': $scope.type
		}
        photoService.upload(photo, $cookies.get('userAuthToken'));
    };
	
	$scope.deleteFile = function(filename){
		photoService.deletePhoto(filename, $cookies.get('userAuthToken'))
		.then(function(response) {
			$scope.getAllPhotos();
		})
		.catch(function(response) {
		});
	};
	
	$scope.getAllPhotos = function() {
		photoService.getAllPhotos($cookies.get('userAuthToken'))
		.then(function(response) {
			$scope.allPhotos = response.data;
		})
		.catch(function(response) {
			$scope.allPhotos = response.data;
		});
	};
	
	$scope.init = function(){
		$scope.getAllPhotos();
		
	};
	
	$scope.init();
	
}])
 
.factory('photoService', ['$http', function ($http) {
	
	var serviceBase = '/rinoplastie/v1';
	
    this.upload = function(photo, authToken){
        var fd = new FormData();
        fd.append('before', photo.before);
        fd.append('after', photo.after);
        fd.append('type', photo.type);
        $http.post(serviceBase + '/upload', fd, {
            transformRequest: angular.identity,
            headers: {
				'Content-Type': undefined,
				'Authorization': authToken
			}
        })
        .success(function(){
        })
        .error(function(){
        });
    };
	
	this.deletePhoto = function(filename, authToken){
		var delPhoto = {
			'filename' : filename
		};
		
        var request = $http.post(serviceBase + '/images/delete', delPhoto, {
            headers: {'Authorization': authToken}
        })
        .success(function(){
        })
        .error(function(){
        });
		return request;
    };
	
	this.getAllPhotos = function(authToken){
        var request = $http.get(serviceBase + '/images', {
			headers: {'Authorization': authToken}
		});
		request.success(function(data, status, headers, config) {
		});
		request.error(function(data, status, headers, config) {
		});
		return request;
	};
	
	return this;
}])

.controller('translateController', ['$scope', '$cookies', '$translate', function($scope, $cookies, $translate){
	
	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$cookies.put('lang', langKey);
	};
	
	$scope.init = function() {
		if ($cookies.get('lang') != null) {
			$scope.changeLanguage($cookies.get('lang'));
		}
	};
	
	$scope.init();
	
}])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
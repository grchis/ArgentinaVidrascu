angular.module('Rinoplastie.controllers', ['ngCookies'])

.controller('loginController', ['$scope', '$rootScope', '$cookies', '$location', 'authService', function ($scope, $rootScope, $cookies, $location, loginSrv) {
	$scope.loginInfo;
	$scope.changePasswordInfo;
	
	$scope.user = {
		'name' : $cookies.get('userName'),
		'email' : $cookies.get('userEmail'),
		'authToken' : $cookies.get('userAuthToken'),
		'createdAt' : $cookies.get('userCreatedAt'),
		'error' : $cookies.get('userError')
	};

	$scope.login = function () {
		$location.path('/admin');
		loginSrv.login($scope.loginInfo)
		.then(function(response) {
			$scope.user = response.data;
			$location.path('/admin');
		})
		.catch(function(response) {
			$scope.user = response.data;
		});
    };
	
	$scope.changePassword = function () {
		loginSrv.changePassword($scope.changePasswordInfo, $cookies.get('userAuthToken'))
		.then(function(response) {
		})
		.catch(function(response) {
		});
    };
	
	$scope.logout = function () {
		loginSrv.logout($scope.user.authToken)
		.then(function(response){
			$scope.user = null;
			$location.path('/login');
		})
		.catch(function(response){
		});
    };
	
	$scope.isUserLoggedIn = function () {
		alert($scope.user != null && $scope.user.error != null && $scope.user.error != true);
    };
	
	$scope.userInfo = function () {
		alert(JSON.stringify($scope.user.name));
    };
}])
 
.factory('authService', ['$http', '$cookies', function($http, $cookies) {
	
	var serviceBase = '/rinoplastie.php';
   
	this.login = function(loginInfo) {
		var request = $http.post(serviceBase + '/login', loginInfo)
		.success(function(data, status, headers, config) {
			$cookies.put('userName', data.name);
			$cookies.put('userEmail', data.email);
			$cookies.put('userAuthToken', data.authToken);
			$cookies.put('userCreatedAt', data.createdAt);
			$cookies.put('userError', data.error);
		})
		.error(function(data, status, headers, config) {
		});
		return request;
    };
	
	this.changePassword = function(changePasswordInfo, authToken) {
		changePasswordInfo.email = $cookies.get('userEmail');
		var request = $http.post(serviceBase + '/changepassword', changePasswordInfo, {
			headers: {'Authorization': authToken}
			})
		.success(function(data, status, headers, config) {
			alert("Password successfully changed");
		})
		.error(function(data, status, headers, config) {
			alert("An error occured. Please fill the fields with correct info");
		});
		return request;
    };
	
	this.logout = function(authToken) {
		var request = $http.get(serviceBase + '/logout', {
			headers: {'Authorization': authToken}
		});
		request.success(function(data, status, headers, config) {
			$cookies.remove('userName');
			$cookies.remove('userEmail');
			$cookies.remove('userAuthToken');
			$cookies.remove('userCreatedAt');
			$cookies.remove('userError');
		});
		request.error(function(data, status, headers, config) {
		});
		return request;
	}
		
   return this;
 }])
 
.controller('adminController', ['$scope', '$cookies', 'photoService', function($scope, $cookies, photoService){
	$scope.allPhotos;
	
	// names should be the same as image folder names
	$scope.banner;
	$scope.gogol;
	$scope.incovoiat;
	$scope.posttraumatic;
	$scope.reoperat;
	
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
			$scope.init();
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
	
	$scope.getPhotosByType = function(type) {
		photoService.getPhotosByType(type, $cookies.get('userAuthToken'))
		.then(function(response) {
			$scope[type] = response.data;
		})
		.catch(function(response) {
			$scope[type] = response.data;
		});
	};
	
	$scope.init = function(){
		$scope.getPhotosByType('banner');
		$scope.getPhotosByType('gogol');
		$scope.getPhotosByType('incovoiat');
		$scope.getPhotosByType('posttraumatic');
		$scope.getPhotosByType('reoperat');
	};
	
	$scope.init();
}])
 
.factory('photoService', ['$http', function ($http) {
	
	var serviceBase = '/rinoplastie.php';
	
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
			alert("Sucessfully uploaded");
			window.location.href="./#/admin";
        })
        .error(function(){
			alert("Unexpected Error!");
			window.location.href="./#/admin";
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
	
	this.getPhotosByType = function(type, authToken){
        var request = $http.get(serviceBase + '/images/' + type, {
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
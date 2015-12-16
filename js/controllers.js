angular.module('Rinoplastie.controllers', ['ngCookies'])

<<<<<<< HEAD
.controller('loginController', ['$scope', '$rootScope', '$cookies', '$location', 'authService', function ($scope, $rootScope, $cookies, $location, loginSrv) {
=======
.controller('loginController', ['$scope', '$rootScope', '$cookies', 'authService', function ($scope, $rootScope, $cookies, loginSrv) {
>>>>>>> final adjustmenrs
	$scope.loginInfo;
	$scope.user = {
		'name' : $cookies.get('userName'),
		'email' : $cookies.get('userEmail'),
		'authToken' : $cookies.get('userAuthToken'),
		'createdAt' : $cookies.get('userCreatedAt'),
<<<<<<< HEAD
		'error' : $cookies.get('userError')
=======
>>>>>>> final adjustmenrs
	};

	$scope.login = function () {
		loginSrv.login($scope.loginInfo)
		.then(function(response) {
			$scope.user = response.data;
<<<<<<< HEAD
			$location.path('/admin');
=======
			$cookies.put('userName', $scope.user.name);
			$cookies.put('userEmail', $scope.user.email);
			$cookies.put('userAuthToken', $scope.user.authToken);
			$cookies.put('userCreatedAt', $scope.user.createdAt);
			$cookies.put('userError', $scope.user.error);
>>>>>>> final adjustmenrs
		})
		.catch(function(response) {
			$scope.user = response.data;
		});
    };
	
	$scope.logout = function () {
		loginSrv.logout($scope.user.authToken)
		.then(function(response){
			$scope.user = null;
<<<<<<< HEAD
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
=======
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
>>>>>>> final adjustmenrs
	
	var serviceBase = '/rinoplastie/v1';
   
	this.login = function(loginInfo) {
		var request = $http.post(serviceBase + '/login', loginInfo)
		.success(function(data, status, headers, config) {
<<<<<<< HEAD
			$cookies.put('userName', data.name);
			$cookies.put('userEmail', data.email);
			$cookies.put('userAuthToken', data.authToken);
			$cookies.put('userCreatedAt', data.createdAt);
			$cookies.put('userError', data.error);
=======
>>>>>>> final adjustmenrs
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
<<<<<<< HEAD
			$cookies.remove('userName');
			$cookies.remove('userEmail');
			$cookies.remove('userAuthToken');
			$cookies.remove('userCreatedAt');
			$cookies.remove('userError');
=======
>>>>>>> final adjustmenrs
		});
		request.error(function(data, status, headers, config) {
		});
		return request;
	}
		
   return this;
 }])
 
<<<<<<< HEAD
.controller('adminController', ['$scope', '$cookies', 'photoService', function($scope, $cookies, photoService){
=======
.controller('photosController', ['$scope', '$cookies', 'photoService', function($scope, $cookies, photoService){
>>>>>>> final adjustmenrs
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
<<<<<<< HEAD
=======
	
>>>>>>> final adjustmenrs
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

<<<<<<< HEAD
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

=======
>>>>>>> final adjustmenrs
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
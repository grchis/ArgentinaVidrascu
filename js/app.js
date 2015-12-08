angular.module('RinoplastieApp', [ 'Rinoplastie.controllers', 'ngRoute' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when("/home", {
				templateUrl : "partials/home.html",
				controller : ""
			}).when("/about", {
				templateUrl : "partials/about.html",
				controller : ""
			}).when("/services", {
				templateUrl : "partials/services.html",
				controller : ""
			}).when("/contact", {
				templateUrl : "partials/contact.html",
				controller : ""
			}).when("/incovoiat", {
				templateUrl : "partials/tip_nas/nasIncovoiat.html",
				controller : ""
			}).when("/gogol", {
				templateUrl : "partials/tip_nas/nasGogol.html",
				controller : ""
			}).when("/lung", {
				templateUrl : "partials/tip_nas/nasLung.html",
				controller : ""
			}).when("/posttraumatic", {
				templateUrl : "partials/tip_nas/nasPosttraumatic.html",
				controller : ""
			}).when("/reoperat", {
				templateUrl : "partials/tip_nas/nasReoperat.html",
				controller : ""
			}).when("/indicatii", {
				templateUrl : "partials/indicatiiGenerale.html",
				controller : ""
			}).otherwise({
				templateUrl : "partials/home.html"
			});

		} ]);
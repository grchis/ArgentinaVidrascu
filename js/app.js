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
			}).when("/interviuri", {
				templateUrl : "partials/interviuriTv.html",
				controller : ""
			}).when("/articol1", {
				templateUrl : "partials/articole/tratamentulMigreneiCuBotox.html",
				controller : ""
			}).when("/articol2", {
				templateUrl : "partials/articole/mezobotox.html",
				controller : ""
			}).when("/articol3", {
				templateUrl : "partials/articole/cercei.html",
				controller : ""
			}).when("/articol4", {
				templateUrl : "partials/articole/implanturileMamare.html",
				controller : ""
			}).when("/articol5", {
				templateUrl : "partials/articole/terapiaDePranz.html",
				controller : ""
			}).when("/articol6", {
				templateUrl : "partials/articole/studiu.html",
				controller : ""
			}).when("/articol7", {
				templateUrl : "partials/articole/ulcerGamba.html",
				controller : ""
			}).otherwise({
				templateUrl : "partials/home.html"
			});

		} ]);
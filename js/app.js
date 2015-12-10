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
			}).when("/articol8", {
				templateUrl : "partials/articole/articolGogol.html",
				controller : ""
			}).when("/articol9", {
				templateUrl : "partials/articole/sculptra.html",
				controller : ""
			}).when("/articol10", {
				templateUrl : "partials/articole/sforaitul.html",
				controller : ""
			}).when("/articol11", {
				templateUrl : "partials/articole/botox.html",
				controller : ""
			}).when("/articol12", {
				templateUrl : "partials/articole/riduri.html",
				controller : ""
			}).when("/diverse", {
				templateUrl : "partials/diverse.html",
				controller : ""
			}).when("/interventie1", {
				templateUrl : "partials/interventii/interventie1.html",
				controller : ""
			}).when("/interventie2", {
				templateUrl : "partials/interventii/interventie2.html",
				controller : ""
			}).when("/interventie3", {
				templateUrl : "partials/interventii/interventie3.html",
				controller : ""
			}).when("/interventie4", {
				templateUrl : "partials/interventii/interventie4.html",
				controller : ""
			}).when("/interventie5", {
				templateUrl : "partials/interventii/interventie5.html",
				controller : ""
			}).when("/interventie6", {
				templateUrl : "partials/interventii/interventie6.html",
				controller : ""
			}).when("/interventie7", {
				templateUrl : "partials/interventii/interventie7.html",
				controller : ""
			}).when("/interventie8", {
				templateUrl : "partials/interventii/interventie8.html",
				controller : ""
			}).when("/interventie9", {
				templateUrl : "partials/interventii/interventie9.html",
				controller : ""
			}).otherwise({
				templateUrl : "partials/home.html"
			});

		} ]);
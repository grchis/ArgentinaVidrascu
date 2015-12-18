angular.module('RinoplastieApp', [ 'Rinoplastie.controllers', 'ngRoute', 'pascalprecht.translate' ]).config(
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
				templateUrl : "partials/tip_nas/nasIncovoiat.php",
				controller : ""
			}).when("/gogol", {
				templateUrl : "partials/tip_nas/nasGogol.php",
				controller : ""
			}).when("/posttraumatic", {
				templateUrl : "partials/tip_nas/nasPosttraumatic.php",
				controller : ""
			}).when("/reoperat", {
				templateUrl : "partials/tip_nas/nasReoperat.php",
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
				templateUrl : "partials/interventii/interventie1.php",
				controller : ""
			}).when("/interventie2", {
				templateUrl : "partials/interventii/interventie2.php",
				controller : ""
			}).when("/interventie3", {
				templateUrl : "partials/interventii/interventie3.php",
				controller : ""
			}).when("/interventie4", {
				templateUrl : "partials/interventii/interventie4.php",
				controller : ""
			}).when("/interventie5", {
				templateUrl : "partials/interventii/interventie5.php",
				controller : ""
			}).when("/interventie6", {
				templateUrl : "partials/interventii/interventie6.php",
				controller : ""
			}).when("/interventie7", {
				templateUrl : "partials/interventii/interventie7.php",
				controller : ""
			}).when("/interventie8", {
				templateUrl : "partials/interventii/interventie8.php",
				controller : ""
			}).when("/interventie9", {
				templateUrl : "partials/interventii/interventie9.php",
				controller : ""
			}).when("/login", {
				templateUrl : "partials/login.html",
				controller : "loginController"
			}).when("/test", {
				templateUrl : "partials/test.html",
				controller : ""
			}).when("/login", {
				templateUrl : "partials/login.html",
				controller : "loginController"
			}).when("/admin", {
				templateUrl : "partials/admin.html",
				controller : "adminController"
			}).otherwise({
				templateUrl : "partials/home.html"
			});

		} ])

		
.run(function($rootScope, $location, $cookies) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
		if ($rootScope.loggedInUser == null) {
			// no logged user, redirect to /login
			var isUserLoggedIn = !($cookies.get('userName') == null && ($cookies.get('userError') == null || ($cookies.get('userError') != null && $cookies.get('userError') != false)));
			if (next.templateUrl === "partials/login.html" && isUserLoggedIn) {
				$location.path("/admin");
			}
			else if (next.templateUrl === "partials/admin.html"  && !isUserLoggedIn) {
				$location.path("/login");
			}
			else {
				// do nothing
			}
		}
    });
})

.config(function($translateProvider){
	$translateProvider.translations('ro', {
		HOME: 'Acasa',
		SERVICES: 'Servicii',
		CV: 'CV',
		CONTACT: 'Contact',
		GENERAL_ADVICE: 'Indicatii generale',
		INTERVIEWS: 'Interviuri',
		INTERVENTIONS: 'Interventii',
		CROOKED_NOSE: 'Nas Incovoiat',
		GOGOL_NOSE: 'Nasul lui Gogol',
		POSTTRAUMATIC_NOSE: 'Nas Posttraumatic',
		REOPERATED_NOSE: 'Nas Reoperat',
		CROOKED_NOSE_DETAILS: ''
	 })
	.translations('en', {
		HOME: 'Home',
		SERVICES: 'Services',
		CV: 'CV',
		CONTACT: 'Contact',
		GENERAL_ADVICE: 'General advice',
		INTERVIEWS: 'Interviews',
		INTERVENTIONS: 'Interventions',
		CROOKED_NOSE: 'Crooked Nose',
		GOGOL_NOSE: 'Gogol\'s Nose',
		POSTTRAUMATIC_NOSE: 'Posttraumatic nose',
		REOPERATED_NOSE: 'Re-operated nose',
		CROOKED_NOSE_DETAILS: ''
	 });
	 $translateProvider.preferredLanguage('ro');
});

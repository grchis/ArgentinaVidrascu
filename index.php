<html ng-app="RinoplastieApp">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, maximum-scale=1">
    <title>Rinoplastie Cluj</title>
    <script type="text/javascript" src="js/wow.js"></script>
    <script type="text/javascript" src="js/custom.js"></script>
    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <link rel="icon" href="favicon.png" type="image/png">
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="css/animate.css" rel="stylesheet" type="text/css">
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="bower_components/angular-translate/angular-translate.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery-scrolltofixed.js"></script>
    <script type="text/javascript" src="js/jquery.nav.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="js/jquery.isotope.js"></script>
    <script type="text/javascript" src="js/jssor.slider.min.js"></script>
	<script src="js/modernizr.js" type="text/javascript"></script>
	<link rel='stylesheet prefetch' href='css/demo.css'>
    <link rel="stylesheet" href="css/style.css">
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='js/slicebox.js'></script>
<script src="js/index.js"></script>
</head>

<body>
    <!--Header_section-->
    <header id="header_wrapper">
        <div class="container">
            <div class="header_box">
                <nav class="navbar navbar-inverse" role="navigation">
                    <div class="navbar-header">
						<img src="/logo/E-mail_Logo_2.jpg" height="90em" width="110em" data-toggle="collapse"></img>
                        <button type="button" id="nav-toggle" class="navbar-toggle" data-toggle="collapse" data-target="#main-nav"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                    </div>
                    <div id="main-nav" class="collapse navbar-collapse navStyle">
                        <ul class="nav navbar-nav" id="mainNav">
                            <li><a href="./#/home" class="scroll-link">{{'HOME' | translate}}</a></li>
                            <li><a href="./#/services" class="scroll-link">{{'SERVICES' | translate}}</a></li>
                            <li><a href="./#/about" class="scroll-link">{{'CV' | translate}}</a></li>
                            <li><a href="./#/contact" class="scroll-link">{{'CONTACT' | translate}}</a></li>
                            <li><a href="./#/indicatii" class="scroll-link">{{'GENERAL_ADVICE' | translate}}</a></li>
                            <li><a href="./#/interviuri" class="scroll-link">{{'MEDIA' | translate}}</a></li>
                            <li><a href="./#/diverse" class="scroll-link">{{'INTERVENTIONS' | translate}}</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
			<div ng-controller="translateController" style="float:right;">
				<button style='background-color:transparent;width:20px;height:11px; background-image:url(../img/icon_ro.gif) ; background-repeat: no-repeat;color: transparent;"'ng-click="changeLanguage('ro')" translate="RO"></button>
				<button style='background-color:transparent; width:20px;height:11px;background-image:url(../img/icon_en.gif) ; background-repeat: no-repeat;color: transparent;"' ng-click="changeLanguage('en')" translate="EN"></button>
			</div>
        </div>
</header>
<!--Header_section--> 
    <script>
        jQuery(document).ready(function($) {

            var jssor_1_options = {
                $AutoPlay: true,
                $AutoPlaySteps: 4,
                $SlideDuration: 160,
                $SlideWidth: 200,
                $SlideSpacing: 3,
                $Cols: 4,
                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,
                    $Steps: 4
                },
                $BulletNavigatorOptions: {
                    $Class: $JssorBulletNavigator$,
                    $SpacingX: 1,
                    $SpacingY: 1
                }
            };

            var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizing
            function ScaleSlider() {
                var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
                if (refSize) {
                    refSize = Math.min(refSize, 809);
                    jssor_1_slider.$ScaleWidth(refSize);
                } else {
                    window.setTimeout(ScaleSlider, 30);
                }
            }
            ScaleSlider();
            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //responsive code end
        });
    </script>

    <style>
        .jssorb03 {
            position: absolute;
        }
        
        .jssorb03 div {
            background-position: -5px -4px;
        }
        
        .jssorb03 div:hover,
        .jssorb03 .av:hover {
            background-position: -35px -4px;
        }
        
        .jssorb03 .av {
            background-position: -65px -4px;
        }
        
        .jssorb03 .dn,
        .jssorb03 .dn:hover {
            background-position: -95px -4px;
        }
        
        .jssora03l {
            background-position: -3px -33px;
        }
        
        .jssora03r {
            background-position: -63px -33px;
        }
        
        .jssora03l:hover {
            background-position: -123px -33px;
        }
        
        .jssora03r:hover {
            background-position: -183px -33px;
        }
        
        .jssora03l.jssora03ldn {
            background-position: -243px -33px;
        }
		
        .jssora03r.jssora03rdn {
            background-position: -303px -33px;
        }
    </style>

    <div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 809px; height: 150px; overflow: hidden; visibility: hidden;">
        <!-- Loading Screen -->
        <div data-u="loading" style="position: absolute; top: 0px; left: 0px; width:100%;">
            <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
            <div style="position:absolute;display:block;background:url('img/loading.gif') no-repeat center center;top:0px;left:0px;width:100%;height:100%;"></div>
        </div>
        <div data-u="slides" style="cursor: default; position: fixed; top: 0px; left: 0px; width: 809px; height: 150px; overflow: hidden;">
      		<?php
			$directory = "img/banner/";
			$images = glob($directory . "*.jpg");
			foreach($images as $image)
			{
			  echo ' <div style="display: none;"><img/banner data-u="image" src="'.$image.'" alt="image1" style="width:100%;height:50%;"/></div>';
			}
?>
</div>
           </div>
<ng-view>
</ng-view>
<footer class="footer_wrapper" id="contact">
   <div class="container">
    <div class="footer_bottom">
	<span style="align:center;">Argentina Vidrascu</span>
	</div>
  </div>
</footer>
  </body>
  
</html>

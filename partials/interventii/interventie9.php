<script src="js/index.js"></script>
<section id="aboutUs"><!--Aboutus-->
<div class="inner_wrapper">
  <div class="container">
    <h2>{{'VAGINAL_REJUVENATION' | translate}}</h2>
    <div class="inner_section">
	<div class="row">
      	<div class=" col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-left">
        	<div class=" delay-01s animated fadeInDown wow animated">
			<p ng-bind-html="'VAGINAL_REJUVENATION_DETAILS' | translate"></p>

	   </div>  	
      </div>
	  	  <div class=" col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-right">
  <p>
	  <p ng-bind-html="'READ_MORE_ABOUT' | translate" style="font-weight: bold"></p>
	  <i>
	  <p><a href="./#/interventie1">{{'VAGINAL_RECONSTRUCTION' | translate}}</a></p>
	  <p><a href="./#/interventie2">{{'BOTOX_WRINKLE_REDUCTION' | translate}}</a></p>
	  <p><a href="./#/interventie3">{{'HYALURONIC_WRINKLE_REMOVAL' | translate}}</a></p>
	  <p><a href="./#/interventie4">{{'LIP_ENLARGEMENT' | translate}}</a></p>
	  <p><a href="./#/interventie5">{{'CIRCLE_REMOVAL' | translate}}</a></p>
	  <p><a href="./#/interventie6">{{'BREAST_IMPLANT' | translate}}</a></p>
	  <p><a href="./#/interventie7">{{'LIPOSUCTION' | translate}}</a></p>
	  <p><a href="./#/interventie8">{{'LABIAPLASTY' | translate}}</a></p>
	  <p><a href="./#/interventie9">{{'VAGINAL_REJUVENATION' | translate}}</a></p>	
	  </i>
</p>	  
</div>
</div>
  </div> 
  </div>
<center>
  <div class="container">
  <div class="wrapper">
    <ul id="sb-slider" class="sb-slider">
      		<?php
			$directory = "../../img_interventii/rejuvenare_vaginala/";
			$images = glob($directory . "*.jpg");
			foreach($images as $image)
			{
			  echo '<li><img src="'.$image.'" alt="image1" /></a></li>';
			}
?>
   </ul>	
<div id="shadow" class="shadow"></div>
    <div id="nav-arrows" class="nav-arrows">
      <a href="#">Next</a>
      <a href="#">Previous</a>
</div>		
</div>
</div>
</section>
<!--Aboutus--> 



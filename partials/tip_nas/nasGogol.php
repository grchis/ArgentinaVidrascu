<script src="js/index.js"></script>
<section id="aboutUs"><!--Aboutus-->
<div class="inner_wrapper">
  <div class="container">
  <h2>{{'GOGOL_NOSE' | translate}}</h2><br/> 
    <div class="inner_section">
	<div class="row">
      <div class=" col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-right">
	    <iframe width="100%" height="35%" src="http://www.youtube.com/embed/2lZ0lm747eE" frameborder="0" allowfullscreen></iframe> 
</div>	  
      	<div class=" col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-left">
        	<div class=" delay-01s animated fadeInDown wow animated">
			<p ng-bind-html="'GOGOL_NOSE_DETAILS' | translate"></p>
			</div>
		</div>
  </div>

 </div> 
    </div>
<center>
  <div style="width:100%;">
  <div class="wrapper">
    <ul id="sb-slider" class="sb-slider">
      		<?php
			$directory ='../../img/gogol/';
			$images = glob($directory . "*.jpg");
			foreach($images as $image)
			{
			  echo '<li><img src="'.$image.'" alt="image1" style="width:100%;height:40%;"/></a></li>';
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
</center>
</section>
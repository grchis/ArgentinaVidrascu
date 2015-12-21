<section id="aboutUs"><!--Aboutus-->
<div class="inner_wrapper">
  <div class="container">
    <h2>{{'REOPERATED_NOSE' | translate}}</h2>
	<div style="align:center;">
        	<div class=" delay-01s animated fadeInDown wow animated">
				<p ng-bind-html="'REOPERATED_NOSE_DETAILS' | translate"></p>
			</div>
		</div>
  </div><br/>
  <div class="container">
  <div class="wrapper">
    <ul id="sb-slider" class="sb-slider">
      		<?php
			$directory = '../../img/reoperat/';
			$images = glob($directory . "*.jpg");
			foreach($images as $image)
			{
			  echo '<li><img src="'.$image.'" alt="image1" style="width:100%;height:50%;"/></a><div class="sb-description"><h3>Argentina Vidrascu</h3></div></li>';
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

<script src='js/slicebox.js'></script>
<script src="js/index.js"></script>
	    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='http://tympanus.net/Development/Slicebox/js/jquery.slicebox.js'></script>
</section>

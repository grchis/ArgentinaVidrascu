<script src="js/index.js"></script>
<section id="aboutUs"><!--Aboutus-->
<div class="inner_wrapper">
  <div class="container">
    <h2>{{'HUMANITARIAN_MISSIONS' | translate}}</h2>
    <div class="inner_section">
	<div class="row">
      <div class=" col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-right">
	  <br/>
	   	<p><strong>"Ziua Bună", ediția din 2 decembrie 2015, partea 2"</strong></p><br/><iframe width="100%" height="35%" src=" https://m.facebook.com/video/video.php?v=1713854172182152" frameborder="0" allowfullscreen></iframe>
	   </div>
      	<div class=" col-lg-7 col-md-8 col-xs-12 pull-left">
        	<div class=" delay-01s animated fadeInDown wow animated">
			<p> <div class="wrapper">
		<ul id="sb-slider" class="sb-slider">
      		<?php
			$directory = "../../img_interventii/misiuni_umanitare/";
			$images = glob($directory . "*.jpg");
			foreach($images as $image)
			{
			  echo '<li><center><img src="'.$image.'" alt="image1" style="width:100%;height:40%;"/></a></li>';
			}
?>
   </ul>	
<div id="shadow" class="shadow"></div>
    <div id="nav-arrows" class="nav-arrows">
      <a href="#">Next</a>
      <a href="#">Previous</a>
</div>		
</div></p>
			</div>
		</div>
  </div>
 </div>  
     </div>
  </div> 
</section>
   
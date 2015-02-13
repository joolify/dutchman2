<!DOCTYPE html>
<html>
	<head>
    	<meta charset="utf-8">
    	<title>Stormrider</title>
    	<link rel="stylesheet" href="assets/css/main.css">
    	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
    	<link href='http://fonts.googleapis.com/css?family=Prociono' rel='stylesheet' type='text/css'>
    	<script src="translate.js"></script>
    	<script type="text/javascript">
    		$(document).ready(function(){
    			translate($("#language option:selected").val());
				$( "#language" ).change(function() {
					translate($("#language option:selected").val());
				});
			})
    	</script>
	</head>
	<body>
		<select id="language">
			<option value="english" selected="selected">English</option>
			<option value="swedish">Svenska</option>
			<option value="spanish">Español</option>
		</select> 
		<div class="jumbotron">
	    	<div class="container">
	        	<h1></h1>
	        	<p></p>
			</div>
		</div>
		<div class="container">
			<form class="login-form" action="login.php">
		        <div>
		        	<input type="text" class="text">
		        </div>
		        <div>
		        	<input type="password" class="password">
		        </div>
		        <button type="submit"></button>
		      </form>
	    </div>  
    </body>
</html>
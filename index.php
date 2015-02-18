<?php 
  include_once 'check.php';
?>
<html>
  <head>
    <title>Login</title>
    <meta http-equiv="Content-type" value="text/html; charset=UTF-8" />
    <script src="lib/jquery/jquery-latest.min.js"></script>

    <script src="assets/js/helpers/event.js"></script>

    <script src="assets/js/main/loginMain.js"></script>

    <script src="assets/js/controllers/loginController.js"></script>

    <script src="assets/js/views/loginView.js"></script>

    <script src="assets/js/models/loginModel.js"></script>
  </head>
  <body>
    <!-- LOGIN FORM -->
    <form id="loginForm" action="#">
      <input id="username" value="aamsta">
      <input id="password" value="aamsta">
      <button type="submit">submit</button>
      <p><h2 id="errorMsg"></p>
    </form>
  </body>
</html>
<?php exit?>
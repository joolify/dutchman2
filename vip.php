<?php 
  include_once 'check.php';
?>
<html>
  <head>
    <title>VIP</title>
    <meta http-equiv="Content-type" value="text/html; charset=UTF-8" />
    <script src="lib/jquery/jquery-latest.min.js"></script>

    <link rel="stylesheet" type="text/css" href="assets/css/main.css">

    <script src="assets/js/main/vipMain.js"></script>

    <script src="assets/js/controllers/vipController.js"></script>

    <script src="assets/js/models/cartModel.js"></script>
    <script src="assets/js/models/databaseModel.js"></script>
    <script src="assets/js/models/languageModel.js"></script>
    <script src="assets/js/models/menuModel.js"></script>

    <script src="assets/js/other/cartItem.js"></script>
    <script src="assets/js/other/event.js"></script>
    <script src="assets/js/other/item.js"></script>

    <script src="assets/js/views/cartView.js"></script>
    <script src="assets/js/views/drinkView.js"></script>
    <script src="assets/js/views/languageView.js"></script>
    <script src="assets/js/views/menuView.js"></script>
  </head>
  <body>

    <!-- DRINK TABLE -->
    <div id="drinks">
      <!-- SEARCH BAR -->
      <div id="search">
	<label for="query">Search</label>
	<input autocomplete="off" id="query">
      </div>
      <h2>Available items:</h2>
      <div id="drink_table"></div>
    </div>
    <!-- QUICK BUY -->
    <h2>Most bought</h2>
    <div id="quick_buy">
    </div>
    <!-- CART -->
    <h2>Shopping cart</h2>
    <div id="cart">
    </div>
    <h2 id="credit">Credit:</h2> <h2 id="totalPrice">Total price:</h2>
  </body>
</html>
<?php exit?>
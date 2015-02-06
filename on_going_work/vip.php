<?php session_start(); // Makes $_SESSION available?>
<?php if(count($_SESSION) == 0) {
  header("Location: index.php"); // Returns to index if no session exists
  }?>
<!DOCTYPE html>
<html>
  <head>
    <title>Stormrider</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="main.css">
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript">
      $(document).ready(fetchItems());
      function fetchItems(){
        var counter;
        var index;
        $.getJSON(
          'http://pub.jamaica-inn.net/fpdb/api.php?' +
          'username=<?php echo $_SESSION['username'];?>' +
          '&password=<?php echo $_SESSION['username'];?>' +
          '&action=inventory_get',
          function(data) {
          $("div#drink_table").empty();
          var search_string = $("#search").val().toLowerCase();
          var search_array = search_string.split(" ");
          var lower_bound = Math.ceil((search_array.length)/2);
          $("div#drink_table").append('<table id="drink_table"></table>');
          $.each(data.payload, function (key, beer){
            var namn = beer.namn.toLowerCase();
            var tot_namn = namn + ' ' + beer.namn2.toLowerCase();

            counter = 0;
            for (index = 0; index < search_array.length; index++) {
              if (search_array[index].length > 0 &&
                  tot_namn.indexOf(search_array[index]) > -1) {
                counter++;
              }
            }
            // Filters out items where name is not empty and where enough
            // search terms exist in the item
            if(namn.length > 0 &&
              (search_string.length == 0 || counter >= lower_bound)){
              var beer_namn_string =
                beer.namn2.length == 0 ?
                  beer.namn :
                  beer.namn + '<br>(' + beer.namn2 + ')';
              $("table#drink_table").append(
                '<tr>' +
                  '<td><button ' +
                          'class="item"' +
                          'onclick="addToCart(\'' + escape(beer_namn_string) + '\', ' + beer.pub_price + ')" ' +
                          'draggable="true"' +
                          'value="' + beer.beer_id + '">' +
                          beer_namn_string +
                        '</button></td>' +
                  '<td>' + beer.pub_price + '</td>' +
                  '<td>' + beer.count + '</td>' +
                '</tr>');
            }
          });
          }
      );
      }

      function addToCart(label, price) {
        //Create the row containing the name of the beer and price
        var row = document.createElement("TR");
        var nameCell = document.createElement("TD");
        var decoded_label = unescape(label).replace('<br>', ' ');
        var nameNode = document.createTextNode(decoded_label);
        var priceCell = document.createElement("TD");
        var priceNode = document.createTextNode(price);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        nameCell.appendChild(nameNode);
        priceCell.appendChild(priceNode);

        // Append the row
        document.getElementById("shopping_cart").appendChild(row);

        // Add the price to the sessions total
        var priceNode = document.createElement("TD");
        if (sessionStorage.subtotal) {
          sessionStorage.subtotal = Number(sessionStorage.subtotal) + price;
        } else {
          sessionStorage.subtotal = price;
        }
        document.getElementById("subtotal").innerHTML = sessionStorage.subtotal;
      }
    </script>
  </head>
  <body>
      <h2>Search</h2>
      <input autocomplete="off"
             id="search"
             type="text"
             onkeydown="fetchItems()"></input>
      <h2>Available beers:</h2>
      <div id="drink_table"></div>
      <h2>Most bought</h2>
      <div id="most_bought"></div>
      <h2>Shopping cart</h2>
      <div id="cart_div">
        <table id="shopping_cart">
        <td>Total:</td><td id="subtotal"></td>
        </table>
      </div>
  </body>
</html>
<?php exit ?>

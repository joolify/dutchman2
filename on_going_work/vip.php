<?php session_start(); ?>
<?php if(count($_SESSION) == 0) {
  header("Location: index.php");
  }?>
<!DOCTYPE html>
<html>
  <head>
    <title>Stormrider</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="main.css">
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript">
      $(document).ready(fetch_items());

      function fetch_items(){
        var counter;
        var index;
        $.getJSON(
          'http://pub.jamaica-inn.net/fpdb/api.php?username=anddar&password=anddar&action=inventory_get',
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

            if(namn.length > 0 && (search_array.length == 0 || counter >= lower_bound)){
              var beer_namn_string =
                beer.namn2.length == 0 ?
                  beer.namn :
                  beer.namn + '<br>(' + beer.namn2 + ')';
              $("table#drink_table").append(
                '<tr>' +
                  '<td><button class="item" draggable="true" value="' + beer.beer_id + '">' + beer_namn_string + '</button></td>' +
                  '<td>' + beer.pub_price + '</td>' +
                  '<td>' + beer.count + '</td>' +
                '</tr>');
            }
          });
          }
      );
      }
    </script>
  </head>
  <body>
      <h2>Search</h2>
      <input autocomplete="off" id="search" type="text" onkeydown="fetch_items()"></input>
      <h2>Available beers:</h2>
      <div id="drink_table">
      </div>
      <h2>Most bought</h2>
      <h2>Shopping cart</h2>
  </body>
</html>

<?php session_start(); ?>
<?php if(count($_SESSION) == 0) {
  header("Location: index.php");
  }?>

<?php
  $json_url = 'http://pub.jamaica-inn.net/fpdb/api.php?username=';
  $json_url .= $_SESSION['username'];
  $json_url .= '&password=';
  $json_url .= $_SESSION['password'];
  $beers_url = $json_url . '&action=inventory_get';
  $json = file_get_contents($beers_url);
  $beers = json_decode($json, true);
  $beers = $beers['payload'];
  ?>
<!DOCTYPE html>
<html>
  <head>
    <title>Stormrider</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="assets/css/main.css">
  </head>
  <body>
      <h2>Search</h2>
      <input class="search-bar" type="text"></input>
      <h2>Available beers:</h2>
      <div class="drink_table">
        <table class="drink_table">
        <tr><th class="item">Name</th><th class="item">Price</th><th class="item">In stock</th></tr>
        <?php
          foreach ($beers as $beer_id => $beer) {
            echo '<tr>';
            echo '<td><button class="item" draggable="true" value="'.$beer_id.'">' . $beer['namn'];
            echo (!empty($beer['namn2'])) ? '<br>(' . $beer['namn2'] .')' : '';
            echo '</button></td>';
            echo '<td>' . $beer['pub_price'] . '</td>';
            echo '<td>' . $beer['count'] . '</td>';
            echo '</tr>';
          }
        ?>
        </table>
      </div>
      <h2>Most bought</h2>
      <h2>Shopping cart</h2>
  </body>
</html>

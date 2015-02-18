<?php
include('simple_html_dom.php');

function get_image_link($item_id, $part_no) {

$html = file_get_html('http://www.systembolaget.se/Sok-dryck/Dryck/?artikelId='.$item_id.'&varuNr='.$part_no);

foreach($html->find('div#ctl00_FullRegion_LeftCenterRegion_ProductImageDiv') as $div);

foreach($div->find('a') as $img);

return 'http://www.systembolaget.se/Sok-dryck/Dryck' . $img->href;

}
echo '<img src="'.get_image_link(335527, 6697).'">';
?>



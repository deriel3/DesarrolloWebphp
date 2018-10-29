<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $data =file_get_contents("data-1.json");
  echo   $data;
}

?>

<?php 
	/*
  * Datos de conexión a MySQL
  */
  $db_database = 'manwil_db';
  $db_hostname = 'localhost';
  $db_username = 'root';
  $db_password = 'm4w1l';

  /*
  * Creación del objeto mysqli
  */
  $mysqli = new mysqli($db_hostname, $db_username, $db_password, $db_database);

  /*
  */
  if (mysqli_connect_errno()) {
      printf("Falló la conexión: %s\n", mysqli_connect_error());
      exit();
  }
?> 
  

<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['codigo']) ) {

		mysqli_query($link,"DELETE FROM cliente WHERE id_cliente='".$_POST['codigo']."'");

	}
	$var = "Se elimino";
	echo json_encode($var);;
	mysqli_close($link);
?>
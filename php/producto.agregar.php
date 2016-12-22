<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['codigo']) ) {


		$codigo = (string)$_POST['codigo'];
		$nombre = (string)$_POST['nombre'];
		$psf = (string)$_POST['precio_sinFactura'];
		$pp = (string)$_POST['precio_preventista'];
		$precio = (string)$_POST['precio'];
		$observacion = (string)$_POST['observacion'];
		$pm= $_POST['precio_megas'];

		mysqli_query($link,"INSERT INTO producto (id_producto, nombre, precio_sinFactura, precio_preventista, precio_fabrica, observacion, precio_megas)
		VALUES ('".$codigo."','".$nombre."','".$psf."','".$pp."','".$precio."','".$observacion."','".$pm."')");

		
		$var = $codigo.', '.$nombre.', '.$psf.', '.$pp.', '.$precio.', '.$observacion;
	}
	echo json_encode($var);;
	mysqli_close($link);
?>
<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['codigo']) ) {
		$codigo = $_POST['codigo'];
		$nombre = $_POST['nombre'];
		$psf = $_POST['precio_sinFactura'];
		$pp = $_POST['precio_preventista'];
		$precio = $_POST['precio'];
		$observacion = $_POST['observacion'];
		$pm= $_POST['precio_megas'];


		mysqli_query($link,"UPDATE producto SET nombre = '".$nombre."', precio_preventista = '".$pp."', precio_sinFactura = '".$psf."', precio_fabrica ='".$precio."', precio_megas = '".$pm."', observacion = '".$observacion."' WHERE id_producto = '".$codigo."'");

		$var = $_POST['codigo'].', '.$_POST['nombre'].', '.$_POST['precio_preventista'].', '.$_POST['precio_sinFactura'].', '.$_POST['precio'].', '.$_POST['observacion'];
	}
	echo json_encode($var);;
	mysqli_close($link);
?>
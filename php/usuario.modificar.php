<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	$co = "";
	$em = "";
	$no = "";
	$ro = "";
	$im = "";
	$ob = "";
	$pa = "";
	$cr = "";

	if( isset($_POST['id_usuario']) ) {

		$co = (string)$_POST['id_usuario'];
		$em = (string)$_POST['id_empleado'];
		$no = (string)$_POST['nombre'];
		$ro = (string)$_POST['rol'];
		$im = (string)$_POST['imagen'];
		$ob = (string)$_POST['observacion'];
		$pa = (string)$_POST['password'];
		$cr = (string)$_POST['correo'];
		

		mysqli_query($link,"UPDATE usuario SET  nombre ='".$no."', id_empleado ='".$em."', rol ='".$ro."', imagen ='".$im."', observacion ='".$ob."', password ='".$pa."', correo ='".$cr."' WHERE id_usuario = '".$co."'");
		$var = "modificado";
		
	}
	//$var = "hecho modificado empleado";
	echo json_encode($var);
	mysqli_close($link);
?>
<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['nombre']) ) {


		//$codigo = (string)$_POST['codigo'];
		$nombre = (string)$_POST['nombre'];
		$apellido = (string)$_POST['apellido'];
		$nombreE = (string)$_POST['nombreE'];
		$nit = (string)$_POST['nit'];
		$direccion = (string)$_POST['direccion'];
		$celular = (string)$_POST['celular'];
		$observacion = (string)$_POST['observacion'];
		$rs = (string)$_POST['razon_social'];
		$id_em = (string)$_POST['id_empleado'];
		$n_em = (string)$_POST['nombre_empleado'];

		mysqli_query($link,"INSERT INTO cliente (nombre, apellido, nombre_empresa, nit, direccion, celular, observacion, razon_social, id_empleado, nombre_empleado)
		VALUES ('".$nombre."','".$apellido."','".$nombreE."','".$nit."','".$direccion."','".$celular."','".$observacion."','".$rs."','".$id_em."','".$n_em."')");

		
		$var = $nombre.', '.$apellido.', '.$nombreE.', '.$nit.', '.$direccion.','.$celular.', '.$observacion;
	}
	echo json_encode($var);;
	mysqli_close($link);
?>
<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['codigo']) ) {

		$codigo = $_POST['codigo'];
		$nombre = $_POST['nombre'];
		$apellido = $_POST['apellido'];
		$nombreE = $_POST['nombreE'];
		$nit = $_POST['nit'];
		$direccion = $_POST['direccion'];
		$celular = $_POST['celular'];
		$observacion = $_POST['observacion'];
		$rs = (string)$_POST['razon_social'];
		$id_em = (string)$_POST['id_empleado'];
		$n_em = (string)$_POST['nombre_empleado'];

		mysqli_query($link,"UPDATE cliente SET nombre = '".$nombre."', apellido= '".$apellido."', nombre_empresa = '".$nombreE."', nit ='".$nit."', direccion ='".$direccion."' , celular ='".$celular."', observacion = '".$observacion."', razon_social ='".$rs."', id_empleado = '".$id_em."', nombre_empleado ='".$n_em."' WHERE id_cliente = '".$codigo."'");

		$var = $_POST['codigo'].', '.$_POST['nombre'].', '.$_POST['apellido'].','.$_POST['nombreE'].','.$_POST['nit'].', '.$_POST['direccion'].', '.$_POST['celular'].', '.$_POST['observacion'];
	}
	
	echo json_encode($var);;
	mysqli_close($link);
?>
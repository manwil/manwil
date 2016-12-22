<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['empleado_nombre']) ) {


		//$co = (string)$_POST['empleado_codigo'];
		$no = (string)$_POST['empleado_nombre'];
		$ap = (string)$_POST['empleado_apellido'];
		$fn = (string)$_POST['empleado_fechaNacimiento'];
		$ci = (string)$_POST['empleado_ci'];
		$di = (string)$_POST['empleado_direccion'];
		$te = (string)$_POST['empleado_telCel'];
		$fi = (string)$_POST['empleado_fechaIngreso'];
		$fr = (string)$_POST['empleado_fechaRetiro'];
		$ho = (string)$_POST['empleado_horario'];
		$ca = (string)$_POST['empleado_cargo'];
		$ga = (string)$_POST['empleado_garante'];
		$hv = (string)$_POST['empleado_hojaVida'];
		$ob = (string)$_POST['empleado_observacion'];
		$se = (string)$_POST['empleado_sexo'];

		mysqli_query($link,"INSERT INTO empleado (nombre, apellido, fecha_nacimiento, ci, direccion, tel_Cel, fecha_ingreso, fecha_retiro, horario, cargo, garante, hoja_vida, observacion, sexo)
		VALUES ('".$no."','".$ap."','".$fn."','".$ci."','".$di."','".$te."','".$fi."','".$fr."','".$ho."','".$ca."','".$ga."','".$hv."','".$ob."','".$se."')");

	}
	$var = "hecho";
	echo json_encode($var);;
	mysqli_close($link);
?>
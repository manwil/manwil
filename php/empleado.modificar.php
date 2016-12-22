<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);
	$id_empleado = "";
	$id_usuario = "";
	$nombre = "";
	$correo = "";
	$password = "";
	$rol = "";
	$imagen = "";
	$observacion = "";
	if( isset($_POST['empleado_codigo']) ) {

		$co = (string)$_POST['empleado_codigo'];
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

		mysqli_query($link,"UPDATE empleado SET  nombre ='".$no."', apellido ='".$ap."', fecha_nacimiento ='".$fn."', ci ='".$ci."', direccion ='".$di."', tel_Cel ='".$te."', fecha_ingreso ='".$fi."', fecha_retiro ='".$fr."', horario = '".$ho."', cargo ='".$ca."', garante = '".$ga."', hoja_vida ='".$hv."', observacion ='".$ob."', sexo ='".$se."' WHERE id_empleado = '".$co."'");
		$var = "modificado";
		
	}
	//$var = "hecho modificado empleado";
	echo json_encode($var);
	mysqli_close($link);
?>
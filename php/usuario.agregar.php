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

	if( isset($_POST['usuario_psw']) ) {

		if (isset($_POST['usuario_img'])) {
			$imagen = (string)$_POST['usuario_img'];
		};
		if (isset($_POST['usuario_observacion'])) {
			$observacion = (string)$_POST['usuario_observacion'];
		};
		$id_empleado = (string)$_POST['usuario_id_empleado']['id_empleado'];
		$id_usuario = (string)$_POST['usuario_id_empleado']['ci'];
		$nombre = (string)$_POST['usuario_id_empleado']['nombre'];
		$correo = (string)$_POST['usuario_correo'];
		$password = (string)$_POST['usuario_psw'];
		$rol = (string)$_POST['usuario_rol'];


		mysqli_query($link,"INSERT INTO usuario (id_usuario, id_empleado, nombre, rol, imagen, observacion, password, correo)
		VALUES ('".$id_usuario."','".$id_empleado."','".$nombre."','".$rol."','".$imagen."','".$observacion."','".$password."','".$correo."')");

	};
	$var = "hecho";
	echo json_encode($var);;
	mysqli_close($link);
?>
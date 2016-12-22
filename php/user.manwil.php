<?php
	
	include "conexion_bd.php";

	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);
	$cont = 0;
	$dato = "";
	$user = "";
	$psw = "";
	$emp = "";
	$rol = "";
	$id_usuario = "";


if( isset($_POST['psw']) ) {
	$sql2 = "SELECT * FROM usuario WHERE  id_usuario ='".$_POST['user']."'";

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $user = $_POST['user'];
    $psw = $_POST['psw'];
    while($row = mysqli_fetch_array($result2)) {

    	$emp = $row['nombre'];
		$dato = $row['password'];
		$id_usuario = $row['id_usuario'];
		$rol = $row['rol'];
        $cont++;
    }
}

	if ($cont == 1) {
		if ( $psw == md5($dato)) {
			$json_grid[0]['nombre'] = $emp;
			$json_grid[0]['rol'] = $rol;
			$json_grid[0]['id_usuario'] = $id_usuario;
			if ($rol == "administrador") {
				//$_SESSION["nota_listar"] = "<a href=\"#/nota_listar\" id=\"color_orange_force_2\">Listar Nota</a>";
				//$_SESSION["nota_reporte"] = "<a href=\"#/nota_reporte\" id=\"color_orange_force\">Reporte Nota</a>";
				//$_SESSION["producto"] = "<a href=\"#/producto\">Producto</a>";
				//$_SESSION["cliente"] = "<a href=\"#/cliente\">Clientes</a>";
				//$_SESSION["empleado"] = "<a href=\"#/empleado_listar\">Empleado</a>";
				//$_SESSION["usuario"] = "<a href=\"#/usuario_listar\">Usuario</a>";
			}
			if ($rol == "otros") {
				//$_SESSION["nota_listar"] = "<a href=\"#/nota_listar\" id=\"color_orange_force_2\">Listar Nota</a>";
				//$_SESSION["nota_reporte"] = "";
				//$_SESSION["producto"] = "";
				//$_SESSION["cliente"] = "";
				//$_SESSION["empleado"] = "";
				//$_SESSION["usuario"] = "";
			}

		}else{
			$json_grid[0]['nombre'] = "0";
		}

	}else{
		$json_grid[0]['nombre'] = "0";
	};
	echo json_encode($json_grid);
	mysqli_close($link);		
?>
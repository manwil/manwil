<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['id_producto']) ) {

		$descripcion = (string)$_POST['descripcion'];
		$id_producto = (string)$_POST['id_producto'];
		$nombre_producto = (string)$_POST['nombre_producto'];
		$fecha = (string)$_POST['fecha'];
		$peso = (string)$_POST['peso'];
		$id_usuario = (string)$_POST['id_usuario'];
		$usuario = (string)$_POST['usuario'];

		//agregar producto al almacen
		mysqli_query($link,"INSERT INTO almacen (descripcion_area, id_producto, nombre_producto, fecha, peso, id_usuario, usuario)
		VALUES ('".$descripcion."','".$id_producto."','".$nombre_producto."','".$fecha."','".$peso."','".$id_usuario."','".$usuario."')");

		//echo "lisrto";
		//seleccionar registro de almacen
		$sql2 = "SELECT * FROM almacen WHERE fecha = '".$fecha."'ORDER BY id_almacen desc";

    	$result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    	$total = 0.0;
    	$cont = 0;
    	//recorrido de los datos de la tabla
    	while($row = mysqli_fetch_array($result2)) {

    		//suma del total en almacen
    		$total = $total + ($row['peso'] * 1);

			$json_grid[$cont]['id_almacen'] = $row['id_almacen'];
			$json_grid[$cont]['descripcion_area'] = $row['descripcion_area'];    	
        	$json_grid[$cont]['id_producto'] = $row['id_producto'];       
        	$json_grid[$cont]['nombre_producto'] = $row['nombre_producto'];       
			$json_grid[$cont]['peso']= $row['peso'];
			$json_grid[$cont]['fecha'] = $row['fecha'];
			$json_grid[$cont]['id_usuario'] = $row['id_usuario'];
        	$json_grid[$cont]['usuario'] = $row['usuario'];
        	
        	//echo json_encode($json_grid[$cont]['sexo']);

        	$cont++;
		}	
		$json_grid[0]['total'] = round($total, 1);

	};
	
	echo json_encode($json_grid);;
	mysqli_close($link);
?>
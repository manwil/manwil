<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	$sql2 = 'SELECT * FROM usuario ORDER BY nombre';

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $cont = 0;
    //recorrido de los datos de la tabla
    while($row = mysqli_fetch_array($result2)) {

		$json_grid[$cont]['id_usuario'] = $row['id_usuario'];
        $json_grid[$cont]['id_empleado'] = $row['id_empleado'];
		$json_grid[$cont]['nombre'] = $row['nombre'];    	
        $json_grid[$cont]['rol'] = $row['rol'];       
		$json_grid[$cont]['imagen']= $row['imagen'];
		$json_grid[$cont]['observacion'] = $row['observacion'];
		$json_grid[$cont]['password'] = $row['password'];
        $json_grid[$cont]['correo'] = $row['correo'];
        //echo json_encode($json_grid[$cont]['sexo']);
        $cont++;
    }

    header('Content-type: application/json; charset=utf-8');
	//echo json_encode($json_grid, JSON_FORCE_OBJECT);
	echo json_encode($json_grid);


	mysqli_close($link);		
?>
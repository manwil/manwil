<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	$sql2 = 'SELECT * FROM empleado ORDER BY nombre';

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $cont = 0;
    //recorrido de los datos de la tabla
    while($row = mysqli_fetch_array($result2)) {

		$json_grid[$cont]['id_empleado'] = $row['id_empleado'];
		$json_grid[$cont]['nombre'] = $row['nombre']." ".$row['apellido'];    	
		$json_grid[$cont]['ci'] = $row['ci'];
        //echo json_encode($json_grid[$cont]['sexo']);
        $cont++;
    }

    header('Content-type: application/json; charset=utf-8');
	//echo json_encode($json_grid, JSON_FORCE_OBJECT);
	echo json_encode($json_grid);


	mysqli_close($link);		
?>
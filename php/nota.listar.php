<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	$sql2 = 'SELECT * FROM nota ORDER BY id_nota DESC';

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $cont = 0;
    //recorrido de los datos de la tabla
    while($row = mysqli_fetch_array($result2)) {

		$json_grid[$cont]['id_nota'] = $row['id_nota'];
        $json_grid[$cont]['cliente'] = $row['cliente'];
		$json_grid[$cont]['empresa'] = $row['empresa'];    	
        $json_grid[$cont]['autorizado'] = $row['autorizado'];       
		$json_grid[$cont]['vendedor']= $row['vendedor'];
		$json_grid[$cont]['fecha_creacion'] = $row['fecha_creacion'];
        $json_grid[$cont]['fecha_baja'] = $row['fecha_baja'];
		$json_grid[$cont]['monto'] = $row['monto'];
        $json_grid[$cont]['baja'] = $row['baja'];
        $json_grid[$cont]['observacion'] = $row['observacion'];
        $json_grid[$cont]['id_nota_papel'] = $row['id_nota_papel'];
        //$json_grid[$cont]['tc'] = $row['tc'];
        //$json_grid[$cont]['deposito'] = $row['deposito'];
        $json_grid[$cont]['tc'] = "";
        $json_grid[$cont]['deposito'] = "";

        //echo json_encode($json_grid[$cont]['sexo']);
        $cont++;
    }

    header('Content-type: application/json; charset=utf-8');
	//echo json_encode($json_grid, JSON_FORCE_OBJECT);
	echo json_encode($json_grid);


	mysqli_close($link);		
?>
<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	$sql2 = "SELECT * FROM cliente";

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $cont = 0;
    //$json_grid = array();
    while($row = mysqli_fetch_array($result2)) {

		$json_grid[$cont]['id_cliente'] = $row['id_cliente'];
		$json_grid[$cont]['nombre'] = $row['nombre']." ".$row['apellido'];      	
        $json_grid[$cont]['nit'] = $row['nit']; 
        $json_grid[$cont]['direccion'] = $row['direccion'];
        $json_grid[$cont]['celular'] = $row['celular']; 
		$json_grid[$cont]['observacion'] = $row['observacion'];
        $json_grid[$cont]['nombre_empresa'] = $row['nombre_empresa']; 
        $json_grid[$cont]['razon_social'] = $row['razon_social'];
        $json_grid[$cont]['nombre_empleado'] = $row['nombre_empleado'];
        $json_grid[$cont]['id_empleado'] = $row['id_empleado'];
    	//array_push($json_grid,json_encode($row));

        /*$res_arr_values[$cont]['id_producto'] = $row['id_producto'];
        $res_arr_values[$cont]['nombre'] = $row['nombre'];
        $res_arr_values[$cont]['fecha_elaboracion'] = $row['fecha_elaboracion'];
        $res_arr_values[$cont]['fecha_vencimiento'] = $row['fecha_vencimiento'];
        $res_arr_values[$cont]['precio_fabrica'] = $row['precio_fabrica'];
        $res_arr_values[$cont]['stock'] = $row['stock'];
        $res_arr_values[$cont]['observacion'] = $row['observacion'];*/
        $cont++;
    }

    header('Content-type: application/json; charset=utf-8');
	//echo '['.json_encode($res_arr_values, JSON_FORCE_OBJECT).']';
	echo json_encode($json_grid);


	mysqli_close($link);		
?>
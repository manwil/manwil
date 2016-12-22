<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);
	if (isset($_POST['id_nota'])) {
		$id = $_POST['id_nota'];
        $id_cliente = "";
		$sql2 = "SELECT * FROM nota WHERE id_nota ='".$id."'";

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
			$json_grid[$cont]['monto'] = $row['monto'];
        	$json_grid[$cont]['baja'] = $row['baja'];
        	//$json_grid[$cont]['tc'] = $row['tc'];
        	//$json_grid[$cont]['deposito'] = $row['deposito'];
            $json_grid[$cont]['tc'] = "";
            $json_grid[$cont]['deposito'] = "";
        	$json_grid[$cont]['id_usuario'] = $row['id_usuario'];
        	$json_grid[$cont]['id_cliente'] = $row['id_cliente'];
            $id_cliente = $row['id_cliente'];
        	$json_grid[$cont]['id_empleado'] = $row['id_empleado'];
        	$json_grid[$cont]['forma_pago'] = $row['forma_pago'];
            $json_grid[$cont]['observacion'] = $row['observacion'];
            $json_grid[$cont]['id_nota_papel'] = $row['id_nota_papel'];

        	//echo json_encode($json_grid[$cont]['sexo']);
        	//$cont++;
    	}


        //cliente razon social
        //$id_cliente = $json_grid[$cont]['id_cliente'];
        $sql3 = "SELECT * FROM cliente WHERE id_cliente ='".$id_cliente."'";

        $result3 = mysqli_query($link,$sql3)or die(mysqli_error());

        //recorrido de los datos de la tabla
        while($row = mysqli_fetch_array($result3)) {

            $json_grid[$cont]['razon_social'] = $row['razon_social'];
            $json_grid[$cont]['nit'] = $row['nit'];

            //echo json_encode($json_grid[$cont]['sexo']);
            //$cont++;
        }

    }
    header('Content-type: application/json; charset=utf-8');
	//echo json_encode($json_grid, JSON_FORCE_OBJECT);
	echo json_encode($json_grid);


	mysqli_close($link);		
?>
<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['codigo']) ) {
		mysqli_query($link,"DELETE FROM nota_pedido WHERE codigo='".$_POST['codigo']."'");

		/////////select pedido
		$sql2 = "SELECT * FROM nota_pedido WHERE id_nota = '".$_POST['id_nota']."'";

    	$result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    	$total = 0;
    	$cont = 0;
    	//recorrido de los datos de la tabla
    	while($row = mysqli_fetch_array($result2)) {

    		$total = $total + (int)$row['subtotal'];
			$json_grid[$cont]['id_nota'] = $row['id_nota'];
			$json_grid[$cont]['id_producto'] = $row['id_producto'];    	
        	$json_grid[$cont]['cantidad'] = $row['cantidad'];       
			$json_grid[$cont]['entregado']= $row['entregado'];
			$json_grid[$cont]['masa'] = $row['masa'];
			$json_grid[$cont]['precio'] = $row['precio'];
        	$json_grid[$cont]['subtotal'] = $row['subtotal'];
        	$json_grid[$cont]['codigo'] = $row['codigo'];
        	$json_grid[$cont]['nombre'] = $row['nombre'];
        	
        	//echo json_encode($json_grid[$cont]['sexo']);

        	$cont++;
		}	
		$json_grid[0]['total'] = $total;
	}
	echo json_encode($json_grid);
	//echo json_encode("hola");
	mysqli_close($link);
?>
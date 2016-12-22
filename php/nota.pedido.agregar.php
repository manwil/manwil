<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['id_nota']) ) {


		$id_nota = (string)$_POST['id_nota'];
		$id_producto = (string)$_POST['notaPedido_codigo'];
		$nombre = (string)$_POST['notaPedido_descripcion'];
		$um = (string)$_POST['notaPedido_masa'];
		$pedido = (string)$_POST['notaPedido_cantidad'];
		$entregado = (string)$_POST['notaPedido_entregado'];
		$pu = (string)$_POST['notaPedido_precio'];
		$subtotal = (string)$_POST['notaPedido_subtotal'];

		mysqli_query($link,"INSERT INTO nota_pedido (id_nota, id_producto, cantidad, entregado, masa, precio, subtotal, nombre)
		VALUES ('".$id_nota."','".$id_producto."','".$pedido."','".$entregado."','".$um."','".$pu."','".$subtotal."','".$nombre."')");

		

		/////////select pedido
		$sql2 = "SELECT * FROM nota_pedido WHERE id_nota = '".$_POST['id_nota']."'";

    	$result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    	$total = 0.0;
    	$cont = 0;
    	//recorrido de los datos de la tabla
    	while($row = mysqli_fetch_array($result2)) {

    		$total = $total + round($row['subtotal'], 1);
			$json_grid[$cont]['id_nota'] = $row['id_nota'];
			$json_grid[$cont]['id_producto'] = $row['id_producto'];    	
        	$json_grid[$cont]['cantidad'] = $row['cantidad'];       
			$json_grid[$cont]['entregado']= $row['entregado'];
			$json_grid[$cont]['masa'] = $row['masa'];
			$json_grid[$cont]['precio'] = $row['precio'];
        	$json_grid[$cont]['subtotal'] = round($row['subtotal'], 1);
        	$json_grid[$cont]['codigo'] = $row['codigo'];
        	$json_grid[$cont]['nombre'] = $row['nombre'];
        	
        	//echo json_encode($json_grid[$cont]['sexo']);

        	$cont++;
		}	
		$json_grid[0]['total'] = round($total, 1);
	}
	echo json_encode($json_grid);
	//echo json_encode("hola");
	mysqli_close($link);
?>
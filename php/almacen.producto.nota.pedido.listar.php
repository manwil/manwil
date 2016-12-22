<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['codigo']) ) {
		

		$fecha = "2016-12-14";
		$coloco1 = false;
		$coloco2 = false;
		//TODO PRODUCTOS/*******************************--------------------------------------------------------------------
		$sql2 = 'SELECT * FROM producto ORDER BY id_producto';

    	$result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    	$contProductos = 0;
    	//$json_grid = array();
    	while($row = mysqli_fetch_array($result2)) {

			$json_gridProducto[$contProductos]['id_producto'] = $row['id_producto'];
			$json_gridProducto[$contProductos]['nombre_producto'] = $row['nombre'];    	
        	$contProductos++;
    	}
    	//echo $contProductos;
		//TODO ALMACEN/*******************************----------------------------------------------------------------------
		$sql2 = "SELECT id_almacen, descripcion_area, id_producto, nombre_producto, peso, id_usuario, usuario, SUM(peso) as peso_total , fecha FROM almacen  WHERE fecha >= '".$fecha."' GROUP BY id_producto";

    	$result2 = mysqli_query($link,$sql2)or die(mysqli_error());
    	$contAlmacen = 0;
    	while($row = mysqli_fetch_array($result2)) {
        	$json_gridAlmacen[$contAlmacen]['id_producto'] = $row['id_producto'];       
        	$json_gridAlmacen[$contAlmacen]['peso_total'] = $row['peso_total'];
           	$contAlmacen++;
		}	

		//TODO VENTAS/**********************-------------------------------------------------------------------------
		$sql2 = "select n.id_nota as id_nota, n.fecha_creacion as fecha, np.id_producto as id_producto, np.nombre as nombre_producto, SUM(np.cantidad) as peso_total from nota as n inner join nota_pedido as np on n.id_nota = np.id_nota where n.fecha_creacion >= '".$fecha."' group by np.id_producto";

    	$result2 = mysqli_query($link,$sql2)or die(mysqli_error());
    	$contVentas = 0;
    	while($row = mysqli_fetch_array($result2)) {

			$json_gridVentas[$contVentas]['id_producto'] = $row['id_producto'];
        	$json_gridVentas[$contVentas]['peso_total'] = $row['peso_total'];
        	$contVentas++;
		}
		$contador = 1;
		//SACAR TODO
		for ($i=0; $i < $contProductos ; $i++) { 
			$json_grid[$i]['n']	= $contador;
			$contador++;
			//echo "num-".$i ;
			$json_grid[$i]['id_producto'] = $json_gridProducto[$i]['id_producto'];	
			$json_grid[$i]['nombre_producto']	= $json_gridProducto[$i]['nombre_producto'];

			$json_grid[$i]['cantidad_entrada'] = 0;
			$json_grid[$i]['cantidad_salida'] = 0;
			//almacen
			for ($j = 0; $j < $contAlmacen; $j++) {
                if( $json_gridAlmacen[$j]['id_producto'] === $json_grid[$i]['id_producto'] ){
                    $json_grid[$i]['cantidad_entrada'] = $json_gridAlmacen[$j]['peso_total'];
                }
            }
            //ventas
			for ($k = 0; $k < $contVentas; $k++) {
                if( $json_grid[$i]['id_producto'] == $json_gridVentas[$k]['id_producto']){
                    $json_grid[$i]['cantidad_salida'] = $json_gridVentas[$k]['peso_total'];
                }
            }
            //Saldo existencia
            $json_grid[$i]['cantidad_saldo'] = $json_grid[$i]['cantidad_entrada'] - $json_grid[$i]['cantidad_salida'];      
		}

	};
	echo json_encode($json_grid);
	mysqli_close($link);
?>
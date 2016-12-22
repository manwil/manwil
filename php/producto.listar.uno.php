<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

if( isset($_POST['codigo']) ) {
	$sql2 = "SELECT * FROM producto WHERE id_producto ='".$_POST['codigo']."'";

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $cont = 0;
    //$json_grid = array();
    while($row = mysqli_fetch_array($result2)) {

		$json_grid[$cont]['id_producto'] = $row['id_producto'];
		$json_grid[$cont]['nombre'] = $row['nombre'];    	
		$json_grid[$cont]['precio_preventista']= $row['precio_preventista'];
		$json_grid[$cont]['precio_megas']= $row['precio_megas'];
		$json_grid[$cont]['precio_sinFactura'] = $row['precio_sinFactura'];
		$json_grid[$cont]['precio_fabrica'] = $row['precio_fabrica'];
		$json_grid[$cont]['observacion'] = $row['observacion'];
		
        $cont++;
    }
}
    header('Content-type: application/json; charset=utf-8');
	//echo '['.json_encode($res_arr_values, JSON_FORCE_OBJECT).']';
	echo json_encode($json_grid);


	mysqli_close($link);		
?>